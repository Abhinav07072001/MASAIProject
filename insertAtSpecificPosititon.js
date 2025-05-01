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
  //insert at specific position
  function insertAtspecificPos(head,data, pos){
    let newNode= new Node(data);
    if(pos==0){
      newNode.next=head
      return head;
    }
    let current=head;
    let count=0;
    while(current!==null && count<pos - 1){
      current= current.next;
      count++
    }
    if(current===null){
      console.log("Pos out of bound");
      return head;
    }
    newNode.next=current.next;
    current.next=newNode;
    
    return head;
  }
  let ans=insertAtspecificPos(first, 55, 2)
  printList(ans)// output 10-20-55-30class Node{
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
//insert at specific position
function insertAtspecificPos(head,data, pos){
  let newNode= new Node(data);
  if(pos==0){
    newNode.next=head
    return head;
  }
  let current=head;
  let count=0;
  while(current!==null && count<pos - 1){
    current= current.next;
    count++
  }
  if(current===null){
    console.log("Pos out of bound");
    return head;
  }
  newNode.next=current.next;
  current.next=newNode;
  
  return head;
}
let ans=insertAtspecificPos(first, 55, 2)
printList(ans)// output 10-20-55-30class Node{
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
//insert at specific position
function insertAtspecificPos(head,data, pos){
  let newNode= new Node(data);
  if(pos==0){
    newNode.next=head
    return head;
  }
  let current=head;
  let count=0;
  while(current!==null && count<pos - 1){
    current= current.next;
    count++
  }
  if(current===null){
    console.log("Pos out of bound");
    return head;
  }
  newNode.next=current.next;
  current.next=newNode;
  
  return head;
}
let ans=insertAtspecificPos(first, 55, 2)
printList(ans)// output 10-20-55-30class Node{
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
//insert at specific position
function insertAtspecificPos(head,data, pos){
  let newNode= new Node(data);
  if(pos==0){
    newNode.next=head
    return head;
  }
  let current=head;
  let count=0;
  while(current!==null && count<pos - 1){
    current= current.next;
    count++
  }
  if(current===null){
    console.log("Pos out of bound");
    return head;
  }
  newNode.next=current.next;
  current.next=newNode;
  
  return head;
}
let ans=insertAtspecificPos(first, 55, 2)
printList(ans)// output 10-20-55-30class Node{
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
//insert at specific position
function insertAtspecificPos(head,data, pos){
  let newNode= new Node(data);
  if(pos==0){
    newNode.next=head
    return head;
  }
  let current=head;
  let count=0;
  while(current!==null && count<pos - 1){
    current= current.next;
    count++
  }
  if(current===null){
    console.log("Pos out of bound");
    return head;
  }
  newNode.next=current.next;
  current.next=newNode;
  
  return head;
}
let ans=insertAtspecificPos(first, 55, 2)
printList(ans)// output 10-20-55-30