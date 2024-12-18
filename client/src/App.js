import { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

const today = new Date();
const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

function App() {
  const [boardContent, setBoardContent] = useState({
    title: '',
    content: '',
  });
  const [viewContent, setViewContent] = useState([]);

  // 수정 상태 관리 (게시물별로 상태를 관리)
  const [editContent, setEditContent] = useState({});

  const handleEditChange = (index, e) => {
    const { name, value } = e.target;
    setEditContent((prevState) => ({
      ...prevState,
      [index]: {
        ...prevState[index],
        [name]: value,
      },
    }));
  };

  const handleSubmitEdit = (index) => {
    const updatedPost = editContent[index];
    const postToUpdate = viewContent[index];
    
  
  
    const idx = postToUpdate.idx;  // id가 제대로 있는지 확인
    console.log(idx);  // 확인을 위한 콘솔 로그
  
    // 서버에 수정된 내용 전송
    Axios.post(`http://localhost:8000/api/update/${idx}`, updatedPost)
      .then((response) => {
        const updatedContent = [...viewContent];
        updatedContent[index] = { ...updatedContent[index], ...updatedPost };
        setViewContent(updatedContent);
        alert('수정 완료!');
      })
      .catch((error) => {
        console.error(error);
        alert('수정에 실패했습니다.');
      });
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    setBoardContent({
      ...boardContent,
      [name]: value,
    });
  };

  const submit = () => {
    Axios.post('http://localhost:8000/api/insert', {
      title: boardContent.title,
      content: boardContent.content,
      date: formattedDate,
    })
      .then((response) => {
        setViewContent([
          ...viewContent,
          { title: boardContent.title, content: boardContent.content, date: formattedDate }
        ]);
        setBoardContent({ title: '', content: '' });
        alert("등록 완료!");
      })
      .catch((error) => alert(error));
  };

  const deletePost = (index) => {
    const idx = viewContent[index].idx;
    const updatedContent = viewContent.filter((item, idx) => idx !== index);
    setViewContent(updatedContent);
    Axios.delete(`http://localhost:8000/api/delete/${idx}`)
      .then((res) => {
        console.log(res.data);
        alert(`게시글 ${idx}번이 삭제되었습니다.`);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    Axios.get('http://localhost:8000/api/get')
      .then((res) => {
        console.log(res.data);
        if (Array.isArray(res.data)) {
          setViewContent(res.data);
        } else {
          console.error('데이터 형식이 올바르지 않습니다:', res.data);
        }
      })
      .catch((error) => {
        console.error('데이터를 가져오는 데 실패했습니다:', error);
      });
  }, []);

  return (
    <div className="App">
      <div className="addListBox">
        <input
          placeholder="제목"
          name="title"
          value={boardContent.title}
          onChange={getValue}
        />
        <input
          placeholder="내용"
          name="content"
          value={boardContent.content}
          onChange={getValue}
        />
        <button onClick={submit}>등록</button>
      </div>

      {viewContent.length > 0 ? (
        viewContent.map((item, index) => (
          <div className="listBox" key={index}>
            <p>{index + 1}</p>
            <p>{item.date}</p>
            <input
              type="text"
              value={editContent[index]?.title || item.title}
              name="title"
              onChange={(e) => handleEditChange(index, e)}
            />
            <input
              type="text"
              value={editContent[index]?.content || item.content}
              name="content"
              onChange={(e) => handleEditChange(index, e)}
            />
            <button onClick={() => handleSubmitEdit(index)}>수정</button>
            <button onClick={() => deletePost(index)}>삭제</button>
          </div>
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </div>
  );
}

export default App;
