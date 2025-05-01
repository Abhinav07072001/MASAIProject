class Node{
    constructor(data){
      this.data=data;
      this.next=null;
    }
  }
  let first=new Node(10);
  let second= new Node(20);
  let third= new Node(30);
  
  first.next= second;
  second.next=third;
  // printing a linked list
  function printList(head){
    let current=head;
    while(current!==null){
      console.log(current.data);
      current=current.next;
    }
  }
  
  // insert at beginning
  function insertAtBeginning(head, data){
    const newNode= new Node(data);
    newNode.next =head;
    return newNode;
  }
  first=insertAtBeginning(first, 5)
  printList(first); //  output 5-10-20-30