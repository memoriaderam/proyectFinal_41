const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			createPost: async (newPost) => {
				try {
					
					const res = await fetch(`${process.env.BACKEND_URL}/api/add/post`, {
						method: "POST",
						body: newPost 
					});

					if (!res.ok) {
						const errorText = await res.text();
						throw new Error(errorText || "Error al crear el post");
					}

					return { success: true };
				} catch (error) {
					console.error("Error al crear post:", error);
					return { success: false, error: error.message };

				}
			},
			getPost: async (newPost) => {
				try {
					const res = await fetch(`${process.env.BACKEND_URL}/api/post/list`)

					if (!res.ok) {
						const errorText = await res.text(); // por si el backend devuelve algo de error
						throw new Error(errorText || "Error al crear el post");
					}

					const data = await res.json();
					return data;//lista de post

				} catch (error) {
					console.error("Error al crear post:", error);
					return [];
				}
			},
			updatePost: async (postId, updatedData) => {
				try {
					const res = await fetch(`${process.env.BACKEND_URL}/api/edit/post/${postId}`, {
						method: "PUT",
						body: updatedData // es FormData no JSON
					});
			
					if (!res.ok) {
						const text = await res.text();
						throw new Error(text || "Error al actualizar post");
					}
			
					const data = await res.json();
					return { success: true, message: data.message };
				} catch (error) {
					console.error("Error al actualizar post:", error);
					return { success: false, error: error.message };
				}
			},
			deletePost: async (postId) => {
				try {
					const res = await fetch(`${process.env.BACKEND_URL}/api/delete/post/${postId}`, {
						method: "DELETE"
					});

					if (!res.ok) {
						const text = await res.text();
						throw new Error(text || "Error al eliminar el post");
					}

					const data = await res.json();
					return { success: true, message: data.message };
				} catch (error) {
					console.error("Error al eliminar post:", error);
					return { success: false, error: error.message };
				}
			}


		}
	};
};



export default getState;
