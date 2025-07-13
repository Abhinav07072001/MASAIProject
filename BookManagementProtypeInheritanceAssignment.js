function book(title, author ,year) {
    this.title=title;
    this.author=author;
    this.year=year;
}
book.prototype.getSummary=function (){
    return `${this.title} by ${this.author}, published in ${this.year} `
};

export { book };