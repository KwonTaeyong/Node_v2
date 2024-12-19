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
  const [editContent, setEditContent] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signupData, setSignupData] = useState({
    id: '',
    password: '',
  });
  const [loginData, setLoginData] = useState({
    id: '',
    password: '',
  })

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
    const idx = postToUpdate.idx; 
    console.log(idx); 
  
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

  const handleSignupChange = (e) => {
    const {name, value} = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleLoginChange = (e) => {
    const {name, value} = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSignupSubmit = () => {
    console.log("SSS")
    Axios.post('http://localhost:8000/api/sign', signupData)
    .then((res) => {
      alert("회원가입 성공!");
      setSignupData({ id: '', password: '' });
    })
    .catch((error) => {
      if (error.response) {
        if (error.response.status === 409) {
          alert("중복된 ID 입니다.");
        } else {
          alert("회원가입 실패");
        }
      } else {
        alert("서버에 연결할 수 없습니다.");
      }
    });
  };

  const handleLoginSubmit = () => {
    Axios.post('http://localhost:8000/api/login', loginData)
     .then((res) => {
        alert("로그인 성공!");
        setLoginData({ id: '', password: '' });
        setIsLoggedIn(true);
      })
      .catch((error) => {
        if(error.response.status === 401) {
          alert("ID 및 PASSWORD를 다시 확인하세요")
        } else {
          console.log(error.response.status)
          alert("로그인 실패");
        }
      })
  }

  const handleLogout = () => {
    Axios.post('http://localhost:8000/api/logout')
    .then((res) => {
      setIsLoggedIn(false);
      console.log(res.status)
      if(res.status === 200) {
        alert("로그아웃 되었습니다.")
      }
    })
    .catch((error) => {
      console.log(error)
    });
  };



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
      <div className='signupBox'>
        <input type='text' name='id'placeholder='아이디' value={signupData.id}
        onChange={handleSignupChange}/>
        <input type='password' name='password' placeholder='비밀번호' value={signupData.password} onChange={handleSignupChange}/>
        <button onClick={handleSignupSubmit}>회원가입</button>
      </div>

      <div className='loginBox'>
        <input type='text' name='id' placeholder='아이디' value={loginData.id}
        onChange={handleLoginChange}/>
        <input type='password' name='password' placeholder='비밀번호' value={loginData.password}
        onChange={handleLoginChange}/>
        <button onClick={handleLoginSubmit}>로그인</button>
      </div>
      {isLoggedIn && (
        <button onClick={handleLogout}>로그아웃</button>
      )}
    </div>
  );
}

export default App;
