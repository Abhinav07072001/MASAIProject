import PhotoCard from './PhotoCard';

export default function Gallery({photos, onOpen}){
    return(
        <div className='grid'>
            {photos.map(p =>(
                <PhotoCard key={p.id} photo={p} onOpen={()=>onOpen(p)} />
            ))}
        </div>
    );
}