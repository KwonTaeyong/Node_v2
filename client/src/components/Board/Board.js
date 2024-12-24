import { useState, useEffect } from "react";
import Axios from "axios";
import BoardList from "./BoardList";
import BoardForm from "./BoardForm";

function Board() {
    const [boardContent, setBoardContent] = useState({
        title: '',
        content: '',
    });

    const [viewContent, setViewContent] = useState([]);

    const submitPost = () => {
        Axios.post('http://localhost:8000/api/insert', {
            title: boardContent.title,
            content: boardContent.content,
            date: new Date().toLocaleDateString(),
        })
        .then((response) => {
            setViewContent([...viewContent, response.data]);
            setBoardContent({ title: '', content: '' });
            alert('등록완료!');
        })
        .catch((error) => alert(error));
    };

    const deletePost = (index) => {
        const idx = viewContent[index].idx;
        Axios.delete(`http://localhost:8000/api/delete/${idx}`)
        .then(() => {
            setViewContent(viewContent.filter((_, i) => i !== index));
            alert('삭제완료!');
        })
        .catch((error) => alert(error));
    };

    useEffect(() => {
        Axios.get('http://localhost:8000/api/get')
        .then((res) => setViewContent(res.data))
        .catch((error) => console.log(error));
    }, []);

    return (
        <div>
            <BoardForm
                boardContent={boardContent}
                setBoardContent={setBoardContent}
                submitPost={submitPost}
            />
            <BoardList
                viewContent={viewContent}
                deletePost={deletePost}
            />
        </div>
    );
}

export default Board; 
