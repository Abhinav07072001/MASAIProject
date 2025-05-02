class Node{
    constructor(data){
      this.data=data;
      this.next=null;
    }
  }
  
  let first= new Node(10);
  let second= new Node(20);
  let third= new Node(40);
  
  first.next=second;
  second.next=third;
  
  function printList(head){
    let current=head;
    while(current!==null){
      console.log(current.data);
      current=current.next;
    }
  }
  // delete at the beginning
  function deleteatBeg(head){
    if(head==null) return null
    let current=head;
    head=head.next;
    current=null;
    return head
  }
  first=deleteatBeg(first) // Reassign the head
  printList(first)