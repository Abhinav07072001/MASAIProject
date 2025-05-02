class Node{
    constructor(data){
      this.data=data;
      this.next=null;
    }
  }
  
  let first= new Node(10);
  let second= new Node(20);
  let third= new Node(40);
  let fourth=new Node(50);
  
  first.next=second;
  second.next=third;
  third.next=fourth
  function printList(head){
    let current=head;
    while(current!==null){
      console.log(current.data);
      current=current.next;
    }
  }
  // delete at the end
  function deleteAtEnd(head){
    if(head==null)return null
    if(head.next==null) return null
    
    let current=head;
    while(current.next.next!==null){
      current=current.next
    }
    current.next=null
    return head;
  }
  first=deleteAtEnd(first) // Reassign the head
  printList(first)