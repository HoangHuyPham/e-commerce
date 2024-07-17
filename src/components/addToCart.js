export const addToCart = (watch, user, favoriteData, setFavoriteData, showToast, navigate) => {
    if (user == null){
        navigate("/sign/in");
    }else{
        const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
        const updatedCart = [...cartData, watch];
        localStorage.setItem("cartData", JSON.stringify(updatedCart));
        showToast(`${watch.name} đã được thêm vào giỏ hàng!`, "Thành công", true);
        window.dispatchEvent(new Event("cartUpdated"));
    }
}

