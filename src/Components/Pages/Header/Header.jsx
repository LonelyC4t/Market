import style from "./style.module.css";
import logoImg from "../../../Image/logo.png";
import { NavLink, useNavigate, useSearchParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSearch } from "../../../redux/slice/filterSlice";
import { useDebounce } from "../../../Hooks/useDebounce";
import { removeUser } from "../../../redux/slice/userSlice";


function Header () {
    const navigate = useNavigate();
    const {authToken} = useSelector(state => state.user);
    const cart = useSelector(state => state.cart);
    

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
    
    const dispatch = useDispatch();
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
                <div className={style.itemImage}>
                    <img className={style.logoItem} alt="Котопёс" src={logoImg}></img>
                    <h3>Хрючево</h3>
                </div>
                <div className="stringSearch">
                    <input value={search} onChange={handleChange} className={style.placeSearch }></input>
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

export {Header};