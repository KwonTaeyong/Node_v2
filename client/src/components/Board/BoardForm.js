function BoardForm({ boardContent, setBoardContent, submitPost }) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBoardContent((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <input
                name="title"
                value={boardContent.title}
                onChange={handleChange}
                placeholder="제목"
            />
            <input
                name="content"
                value={boardContent.content}
                onChange={handleChange}
                placeholder="내용"
            />
            <button onClick={submitPost}>등록</button>
        </div>
    );
}

export default BoardForm;  
