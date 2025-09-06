const mk=(id, w= 800, h= 600)=>({
    id: String(id),
    url: `https://picsu,.photos/id/${id}/${h}`,
    title:`Photo ${id}`,
    tags: id %2 ?["nature", "outdoor"] : ["city", "street"],
    createdAt: Date.now() - id * 1000000
});

export const samplePhotos = Array.from({length: 24 }, (_, i)=> mk(10 + i));