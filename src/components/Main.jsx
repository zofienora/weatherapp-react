import searchImage from '../assets/icons8-suche-50.png';

function Main() {
    return (
      <main className="main-container container">
        <div className="card">
            <div className="search">
                <input type="text" placeholder="Enter city name..." spellCheck="false"/>
                <button><img src={searchImage} alt="search icon" /></button>
            </div>
        </div>
      </main>
    );
  }
  
  export default Main;