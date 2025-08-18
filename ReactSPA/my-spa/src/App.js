import { useEffect, useState } from 'react';
import './App.css';

const Home=()=>(
  <section className='card'>
    <h1>Home Page</h1>
    <p>This is a tiny SPA built with React and no page reloads.</p>
  </section>
);

const About=()=>(
  <section className='card'>
    <h1>About Page</h1>
    <p>We love clean state, small components, and conditional rendering</p>
  </section>
);

const Contact=()=>(
  <section className='card'>
    <h1>Contact Page</h1>
    <p>Ping us at <strong>hello@example.com</strong></p>
  </section>
);
function Navbar({currentpage, onNavigate}){
  const tabs=["home", "about", "contact"];
  const labels={home:"Home" , about:"About", contact:"Contact"};

  return(
    <nav className='navbar'>
      {tabs.map(tab=>(
        <button key={tab} className={`link ${currentpage===tab ?"active":""}`} 
        onClick={()=>onNavigate(tab)}>
          {labels[tab]}
        </button>
      ))}
    </nav>
  );
}
function App() {
  const [page , setpage]=useState("home");

  useEffect=(()=>{
    const title= page==="home"?"Home":page==="about"?"About Us" :"Contact Us";
    document.title=`${title} | MiniSPA`;
  }, [page]);

  const renderPage=()=>{
    switch(page){
      case "home": return <Home />;
      case "about": return <About/>;
      case "contact":return <Contact/>;
      default: return <Home/>;
    }
  };
  return (
    <>
      <Navbar currentpage={page} onNavigate={setpage}/>
      <main className='container' >{renderPage()}</main>
    </>
  );
}

export default App;
