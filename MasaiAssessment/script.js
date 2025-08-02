const ideas=[];

const ideaForm=document.getElementById('ideaform');
const ideaList=document.getElementById('idealist');
const searchInput=document.getElementById('searchInput');

ideaForm.addEventListener('submit', function(e){
    e.preventDefault();
    const title=document.getElementById('title').value;
    const description=document.getElementById('description').value;

    if(title && description){
        ideas.push({title, description,votes:0 });
        document.getElementById('title').value='';
        document.getElementById('description'),value='';
        renderIdeas();
    }
});
searchInput.addEventListener('input', renderIdeas);

function renderIdeas(){
    const search=searchInput.value.toLowerCase();
    const filtered= ideas.filter(idea=> idea.title.toLowerCase().includes(search))
        .sort((a,b)=> b.votes - a.votes);
    
    ideaList.innerHTML='';

    filtered.forEach((idea, index)=>{
        const ideaDiv=document.createElement('div');
        ideaDiv.className='idea';

        ideaDiv.innerHTML=`
        <h3> ${idea.title}</h3>
        <p> ${idea.description}</p>
        <p>Votes: ${idea.votes} </p>
        <button class="vote-btn" onclick="vote(${index})">Upvote</button>`;

        ideaList.appendChild(ideaDiv);
    });

}

function vote(index){
    idea[index].votes++;
    renderIdeas();
}

renderIdeas();