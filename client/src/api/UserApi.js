import axios from 'axios'
import { useEffect, useState } from 'react'

const UserApi = (token) => {
    const [isLogged, setIsLogged] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [cart, setCart] = useState([]);

        //fetch an user and his token
        useEffect(() => {
            if (token) {
                const getUser = async() =>{
                    try {
                        const res = await axios.get('/user/auth', {
                            headers:{Authorization: token},
                        });

                        setIsLogged(true);
                        
                        res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false)
                        setCart(res.data.cart);
                    } catch (error) {
                        alert(error.response.data.msg)
                    }
                };
                getUser()
            }

        }, [token]);

        //add a product to our cart
        const addCart = async (product) => {
            if (!isLogged) return alert("Please login to continue purchase");
        
            const check = cart.every((item) => {
              return item._id !== product._id;
            });
        
            if (check) {
              setCart([...cart, { ...product, quantity: 1 }]);
        
              await axios.patch(
                "/user/addcart",
                { cart: [...cart, { ...product, quantity: 1 }] },
                { headers: { Authorization: token } }
              );
            } else {
              alert("this product has been added to cart");
            }
          };


        return{
            isLogged: [isLogged, setIsLogged],
            isAdmin: [isAdmin, setIsAdmin],
            cart: [cart, setCart],
            addCart: addCart,
        }

    }

export default UserApi;
