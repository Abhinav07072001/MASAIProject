export default function Controls(){
    return(
        <div className="controls">
            <input placeholder="Search photos..." />
            <select defaultValue="newset">
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
            </select>
        </div>
    );
}