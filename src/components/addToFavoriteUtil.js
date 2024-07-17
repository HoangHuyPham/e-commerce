export const addToFavorites = (watch, user, favoriteData, setFavoriteData, showToast, navigate) => {
    if (user == null) {
        navigate("/sign/in");
    } else {
        if (!favoriteData.some((item) => item.id === watch.id)) {
            const updatedFavorites = [...favoriteData, watch];
            setFavoriteData(updatedFavorites);
            localStorage.setItem("favoriteData", JSON.stringify(updatedFavorites));
            showToast(`${watch.name} đã được thêm vào danh sách yêu thích!`, "Thành công", true);
            window.dispatchEvent(new Event('favoritesUpdated'));
        } else {
            showToast(`${watch.name} đã có trong danh sách yêu thích!`, "Thông tin", false);
        }
    }
};
