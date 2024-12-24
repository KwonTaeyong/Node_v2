function BoardItem({ item, index, deletePost }) {
    return (
        <div>
            <p>{item.date}</p>
            <p>{item.title}</p>
            <p>{item.content}</p>
            <button onClick={() => deletePost(index)}>삭제</button>
        </div>
    );
}

 export default BoardItem;