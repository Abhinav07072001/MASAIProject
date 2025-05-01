// Structure of Node
class Node{
    constructor(data){
      this.data=data;
      this.next=null;
    }
  }
  // Creating a linked list
  const head= new Node(10);
  const second= new Node(20);
  const third= new Node(30);
  
  // linking a Node
  head.next=second;
  second.next=third;
  
  //Printing a Linked list
  function printList(head){
    let current= head;
    while(current!==null){
      console.log(current.data);
      current=current.next;
    }
  }
  printList(head);