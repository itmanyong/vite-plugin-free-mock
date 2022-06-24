/*
 * @Author: itmanyong itmanyong@gmail.com
 * @Date: 2022-06-22 21:36:31
 * @LastEditors: itmanyong itmanyong@gmail.com
 * @LastEditTime: 2022-06-24 18:16:35
 * @FilePath: \vite-plugin-api-mock\examples\demo-react\src\App.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const formData = new FormData();
  formData.set('count', 6666666);
  useEffect(() => {
    // fetch('/mock/user/get?name=张三&age=22&id=3333', {
    //   method: 'get',
    // });
    // fetch('/mock/user/delete/1', { method: 'delete' });
    fetch('/mock/user/post/add?nb=nb&name=555', {
      method: 'post',
      // body: '666666666666',
      body: JSON.stringify({ name: '张三', age: 55 }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // fetch(`/mock/user/test/render`,{method:'post'})
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount(count => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
