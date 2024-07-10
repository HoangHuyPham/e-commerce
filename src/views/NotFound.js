import { Button } from "react-bootstrap";
import "../assets/styles/NotFound.scss"
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate();

    const handleBack = ()=>{
        navigate(-1)
    }

    return (
        <div className="NotFound">
            <h1>Trang bạn tìm kiếm không tồn tại...</h1>

            <Button onClick={handleBack}>Quay trở lại trang trước</Button>
        </div>
    );
}

export default NotFound;
