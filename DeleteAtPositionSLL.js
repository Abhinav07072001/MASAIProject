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
  let fifth=new Node(30);
  
  first.next=second;
  second.next=third;
  third.next=fourth
  fourth.next=fifth;
  function printList(head){
    let current=head;
    while(current!==null){
      console.log(current.data);
      current=current.next;
    }
  }
  // delete at the position
  function deleteAtPosition(head,pos){
    if(head==null) return null
    if(pos==0) return head.next;
    
    let current=head
    let count=0
    while(current!==null && count<pos-1){
      current=current.next;
      count++
    }
    if(current==null || current.next==null){
      console.log("postition out of bound")
      return head
    }
    current.next=current.next.next
    
    return head;
  }
    
  first=deleteAtPosition(first, 3) // Reassign the head
  printList(first)