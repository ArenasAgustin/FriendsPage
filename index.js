var listFriends = (contact) => {
	var list = document.querySelector('#lista');
	lista.innerHTML = "";

	for(var i = 0; i < contact.length; i++){
		var friend = document.createElement('li');

		friend.innerHTML = contact[i].name;
      	friend.id = i + 1;
      	friend.setAttribute('class', 'list-group-item list-group-item-secondary')
		list.appendChild(friend);
	}
};

var listFuntion = () => {
	$.get('http://localhost:5000/amigos', listFriends);
};


$('#boton').click(listFuntion);

var printSearch = (contact) => {
	var printer = document.querySelector('#amigo');
	printer.innerHTML = contact.name;
};

var searcher = () => {
	var index = document.querySelector("#input").value;

	$.get(`http://localhost:5000/amigos/${index}`, printSearch);

	$('#input').val('');
};

$('#search').click(searcher);

var deleter = ()=>{
    let input =  document.querySelector("#inputDelete").value;

    $.ajax({
        url: `http://localhost:5000/amigos/${input}`,

       	type: 'DELETE',

        success: ()=>{
            document.querySelector('#sucess').innerHTML = 'Tu amigo fue borrado con exito';

            $('#inputDelete').val('');
            listFuntion();
        }
    })
}

$('#delete').click(deleter)

$('#addBotton').click(async () => {
	let name = document.querySelector('#inputName').value;
	let email = document.querySelector('#inputEmail').value;
	let age = document.querySelector('#inputAge').value;

	console.log(name, email, age);
	let friend = {name, email, age};

	console.log(friend);

	//$.post('http://localhost:5000/amigos', friend);
	$.ajax({
		url: 'http://localhost:5000/amigos',
		type: 'POST',
		data: friend,
		success: (data) =>{
			console.log('Amigo agrado con exito');
			console.log(data);
		}
	})
})