import { useEffect, useState } from "react";

async function fetchProducts(category) {
  const response = await fetch("products.json");
  const data=await response.json();
  console.log("ここある");
  if(category=="All"){
    console.log(data);
    return data;
  }else{
    console.log("else来た");
    console.log(data[0]);
    let filterCategory=[""];
    let j=0;
    for(let i=0;i<12;i++){
      if(data[i].type==category){
        console.log("a");
        filterCategory.push(data);
        j++;
      }
    }
    console.log(filterCategory);
    return filterCategory;
  }
}

export default function App() {
  const [data,setData]=useState([]);
    
  useEffect(() => {
    const fetchData = async () => {
      const newContent = await fetchProducts("All");
      setData(newContent);
    };
    fetchData();
  }, []);
  return (
    <>
      <header>
        <h1>The Can Store</h1>
      </header>
      <div>
        <aside>
          <form>
            <div>
              <label htmlFor="category">Choose a category:</label>
              <select id="category"
              onChange={async(event)=>{
                const selctCategory=event.target.value;
                const newCategory=await fetchProducts(selctCategory);
                setData(newCategory);
              }}>
                <option>All</option>
                <option>Vegetables</option>
                <option>Meat</option>
                <option>Soup</option>
              </select>
            </div>
            <div>
              <label htmlFor="searchTerm">Enter search term:</label>
              <input type="text" id="searchTerm" placeholder="e.g. beans" />
            </div>
            <div>
              <button>Filter results</button>
            </div>
          </form>
        </aside>
        <main>
          {data.map((data,index)=>{
            return(
              <section key={index} className={data.name}>
                <h2>{data.name}</h2>
                <p>${data.price}</p>
                <img src={data.image} alt={data.name} />
              </section>
            );
          })}
        </main>
      </div>
      <footer>
        <p>All icons found at the Noun Project:</p>
        <ul>
          <li>
            Bean can icon by{" "}
            <a href="https://thenounproject.com/yalanis/">Yazmin Alanis</a>
          </li>
          <li>
            Vegetable icon by{" "}
            <a href="https://thenounproject.com/skatakila/">Ricardo Moreira</a>
          </li>
          <li>
            Soup icon by{" "}
            <a href="https://thenounproject.com/ArtZ91/">Arthur Shlain</a>
          </li>
          <li>
            Meat Chunk icon by{" "}
            <a href="https://thenounproject.com/smashicons/">Oliviu Stoian</a>.
          </li>
        </ul>
      </footer>
    </>
  );
}