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
  
  // insert at end
  function insertAtEnd(head ,data){
    const newNode= new Node(data);
    if(!head) return newNode;
    
    let current=head;
    while(current.next!==null){
      current= current.next;
    }
    current.next=newNode
    return head;
  }
  
  first= insertAtEnd(first, 40)
  printList(first)// output 10-20-30-40