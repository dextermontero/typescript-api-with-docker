Note: Ensure you already installed Docker container and Postman. If not, install it first. 

1. Open cmd or git
2. Type git clone https://github.com/dextermontero/typescript-api-with-docker.git
3. Type cd typescript-api-with-docker
4. To run the file 
	- Type: docker compose -f docker-compose.dev.yml up
5. Wait until the installation finished and you can see the log message "Server is running localhost:4000"
6. After that, Open the Postman
7. Create new Collection

8. To list all contact:
	- Add a Request and change method to "GET"
	- In URL type: localhost:4000 and Hit the "send" button

9. To Create a new contact:
	- Add a Request and change method to "POST"
	- In URL type: localhost:4000/create
	- Click Body below the URL, change the "none" to "raw" it will show the dropdown menu and select JSON
	- Inside the body paste this format
	{
		"name": "Changeme",
		"email": "Changeme",
		"address": "Changeme",
		"phone": "Changeme"
	}
	- after changing the value hit the send button
   
10. To display one contact:
	Note: Change the value of "id" in url 
	- Add a Request and change method to "GET"
	- In URL type: localhost:4000/view/id 
	- Hit the "send" button

11. To delete the contact: 
	Note: Change the value of "id" in url 
	- Add a Request and change method to "GET"
	- In URL type: localhost:4000/delete/id 
	- Hit the "send" button

12. To update the contact:
	Note: Change the value of "id" in url 
	- Add a Request and change method to "PUT"
	- In URL type: localhost:4000/update/id
	- Click Body below the URL, change the "none" to "raw" it will show the dropdown menu and select JSON
	- Inside the body paste this format
	{
		"name": "Changeme",
		"email": "Changeme",
		"address": "Changeme",
		"phone": "Changeme"
	}
	- after changing the value hit the send button