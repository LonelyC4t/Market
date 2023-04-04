import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, NavLink, useSearchParams} from "react-router-dom";
import { useDebounce } from "../../../hooks/useDebounce";
import { changeSearch } from "../../../redux/slice/filterSlice";
import { removeUser } from "../../../redux/slice/userSlice";
import style from "./header.module.css";


function MobileHeader () {
    const navigate = useNavigate();
    const {authToken} = useSelector(state => state.user);
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    
    function signOut() {
        dispatch(removeUser())
        navigate("signin");
        return;
    };
    
    const [searchParams] = useSearchParams();
    const [search, setSearch] = useState(()=>{
        const firstSearch = searchParams.get('search');

        return firstSearch ? firstSearch : "";
    });
    
    const debounceValue = useDebounce(search, 1000);

    function handleChange(event){
        let searchValue = event.target.value;
        setSearch(searchValue);

        if (searchValue) {
            return navigate({
                pathname: "products",
                search: `?search=${searchValue}`
            })
        }
        
        return navigate({
            pathname: "products",
            
        })
    };
    
    useEffect(()=>{
        dispatch(changeSearch(debounceValue))
    },[dispatch, debounceValue])

    return (
        <div className={style.upContainer}>
            <div className={style.item}>
                
                <div className="stringSearch">
                    <input value = {search} onChange = {handleChange} className={style.placeSearch}></input>
                </div>
                <div className={style.buttonContainer}>
                <nav className={style.buttonContainer}>
                        <NavLink className={({isActive}) => isActive ? style.headerButtonActive : style.headerButton} to={"products"}>Product</NavLink>
                        <NavLink className={({isActive}) => isActive ? style.headerButtonActive : style.headerButton} to={"cart"}>Сart {authToken ? <p className={style.cartNumber}>{cart.length}</p>  : null}</NavLink>
                        <NavLink className={({isActive}) => isActive ? style.headerButtonActive : style.headerButton} to={"me"}>User</NavLink>
                        
                        <div>
                            {!authToken && <button className={style.buttonIn} onClick={()=>navigate("signin")}>signIn</button>}
                            {authToken && <button className={style.buttonOut} onClick={()=>signOut()}>signOut</button>}
                        </div>

                    </nav>
                </div>
            </div>
        </div>
    )
};

export {MobileHeader};