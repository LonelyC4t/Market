
export const totalPrice = (count=1, price=1, discount=1) => {

    return count * price * (1 - discount / 100)
};