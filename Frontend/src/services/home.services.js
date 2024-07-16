
import { request, requestForFile } from '../utils/axios.service';
import { fetchWrapper } from '../utils/fetch.wrapper'

/////////////////////////   ADMIN SIDE APIS    ////////////////////////////////
export const getAdminLoginData = (body) => {
    return request(`${process.env.REACT_APP_ADMIN_API}/login`, "POST", false, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const Adminlogout = () => {
    return request(`${process.env.REACT_APP_ADMIN_API}/logout`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const AddBook = (body) => {
    return requestForFile(`${process.env.REACT_APP_ADMIN_API}/add_book`, "POST", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};
export const ListBook = () => {
    return request(`${process.env.REACT_APP_ADMIN_API}/All_books`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const deletebook = (body) => {
    return request(`${process.env.REACT_APP_ADMIN_API}/delete_book`, "PUT", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const PendingOrderData = () => {
    return request(`${process.env.REACT_APP_ADMIN_API}/pending_orders`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const acceptOrder = (body) => {
    return request(`${process.env.REACT_APP_ADMIN_API}/accept_order`, "PUT", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const rejectOrder = (body) => {
    return request(`${process.env.REACT_APP_ADMIN_API}/reject_order`, "PUT", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const AllOrderData = () => {
    return request(`${process.env.REACT_APP_ADMIN_API}/all_orders`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const AllCount = () => {
    return request(`${process.env.REACT_APP_ADMIN_API}/all_count`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const AcceptedOrderData = () => {
    return request(`${process.env.REACT_APP_ADMIN_API}/accepted_orders`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const RejectedOrderData = () => {
    return request(`${process.env.REACT_APP_ADMIN_API}/rejected_orders`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const getOrderDetails = (body) => {
    return request(`${process.env.REACT_APP_ADMIN_API}/order_details`, "POST", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};
/////////////////////////   USER SIDE APIS    ////////////////////////////////
export const ListBookUser = () => {
    return request(`${process.env.REACT_APP_USER_API}/books_listing`, "GET", false)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const getUserLoginData = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/login`, "POST", false, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const getRegisterUser = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/register`, "POST", false, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const Userlogout = () => {
    return request(`${process.env.REACT_APP_USER_API}/logout`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const ItemAddToCart = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/add_to_cart`, "POST", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const getCartData = () => {
    return request(`${process.env.REACT_APP_USER_API}/cart_data`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const deleteProduct = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/delete_product_cart`, "POST", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const ProductOrder = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/product_order`, "POST", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const getMyOrderData = () => {
    return request(`${process.env.REACT_APP_USER_API}/my_orders`, "GET", true)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const updateCartd = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/update_cart`, "PUT", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};

export const getMyOrderDetails = (body) => {
    return request(`${process.env.REACT_APP_USER_API}/my_order_details`, "POST", true, body)
        .then((response) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
            throw error;
        });
};