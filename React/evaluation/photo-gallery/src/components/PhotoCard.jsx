export default function PhotoCard({photo, onOpen}){
    return(
        <button className="card" onClick={onOpen} title={photo.title}>
            <img src={photo.url} alt={photo.title} loading="lazy" />
            <div className="meta">
                <span className="title">
                    {photo.title}
                </span>
                <span className="tags">
                    {photo.tags.join(", ")}
                </span>
            </div>
        </button>
    );
}