// GET REQUEST
const getTodos = () => {
  axios("https://jsonplaceholder.typicode.com/todos", {
    params: {
      _limit: 5,
    },
  })
    .then((result) => {
      showOutput(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// POST REQUEST
const addTodo = () => {
  axios
    .post("https://jsonplaceholder.typicode.com/todos", {
      title: "A new Todo ",
      completed: false,
    })
    .then((result) => {
      showOutput(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// PUT/PATCH REQUEST
const updateTodo = () => {
  axios
    .put("https://jsonplaceholder.typicode.com/todos/1", {
      title: "Updated Todo ",
      completed: true,
    })
    .then((result) => {
      showOutput(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// DELETE REQUEST
const removeTodo = () => {
  axios
    .delete("https://jsonplaceholder.typicode.com/todos/1")
    .then((result) => {
      showOutput(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// SIMULTANEOUS DATA
const getData = () => {
  axios
    .all([
      axios.get("https://jsonplaceholder.typicode.com/posts"),
      axios.get("https://jsonplaceholder.typicode.com/todos"),
    ])
    .then(
      axios.spread((posts, todos) => {
        console.log(posts);
        showOutput(todos);
      })
    )
    .catch((err) => console.log(err));
};

// CUSTOM HEADERS
const customHeaders = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "MyToken",
    },
  };
  axios
    .post(
      "https://jsonplaceholder.typicode.com/todos",
      {
        title: "A new Todo ",
        completed: false,
      },
      config
    )
    .then((result) => {
      showOutput(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: "post",
    url: "https://jsonplaceholder.typicode.com/todos",
    data: {
      title: "Hello World",
    },
    transformResponse: axios.defaults.transformResponse.concat((data) => {
      data.title = data.title.toUpperCase();
      return data;
    }),
  };

  axios(options).then((res) => showOutput(res));
}

// ERROR HANDLING
const errorHandling = () => {
  axios("https://jsonplaceholder.typicode.com/todoss")
    .then((result) => {
      showOutput(result);
    })
    .catch((err) => {
      if (err.response) {
        alert("Something went Wrong!");
      } else if (err.request) {
        console.log(err.request);
      } else {
        console.log(err.message);
      }
    });
};

// CANCEL TOKEN
const cancelToken = () => {
  const source = axios.CancelToken.source();
  axios("https://jsonplaceholder.typicode.com/todos", {
    cancelToken: source.token,
  })
    .then((result) => {
      showOutput(result);
    })
    .catch((error) => {
      if (axios.isCancel(error)) {
        console.log("Request Cancelled", error.message);
      }
    });

  if (true) {
    source.cancel("Request Cancelled!");
  }
};

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  (config) => {
    console.log(
      `${config.method.toUpperCase()} request sent to ${
        config.url
      } at ${new Date().getTime()}`
    );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// AXIOS INSTANCES
const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// axiosInstance.get("/comments").then((res) => showOutput(res));

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document
  .getElementById("transform")
  .addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
