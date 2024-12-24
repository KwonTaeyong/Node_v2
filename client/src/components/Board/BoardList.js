import BoardItem from "./BoardItem";

function BoardList({ viewContent, deletePost }) {
    return (
        <div>
            {viewContent.length > 0 ? (
                viewContent.map((item, index) => (  
                    <BoardItem
                        key={index}
                        item={item}
                        index={index}
                        deletePost={deletePost}
                    />
                ))
            ) : (
                <p>게시물이 없습니다.</p>
            )}
        </div>
    );
}

export default BoardList;
