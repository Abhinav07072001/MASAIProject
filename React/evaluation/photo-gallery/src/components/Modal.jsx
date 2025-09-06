export default function Modal({photo, onClose}){
    if(!photo) return null;
    return(
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal" onClick={e=>e.stopPropagation()}>
                <img src={photo.url} alt={photo.title} />
                <div className="modal-info">
                    <h3>{photo.title}</h3>
                    <p>Tags: {photo.tags.join(", ")}</p>
                    <button className="close" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}