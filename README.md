<h1>iNoteBook - Notes Application</h1>
<p>Introducing iNoteBook, my note-taking app offering seamless organization and retrieval of notes. Built with React,
  Node.js, Express, and MongoDB, it provides a user-friendly interface for creating, editing, and categorizing notes.
  Users can securely store their thoughts, ideas, and reminders while accessing them from any device. With backend
  support and intuitive frontend design, it ensures efficient note management for enhanced productivity.</p>
<h2>Technologies Used</h2>
<ul>
  <li>React</li>
  <li>Node.js</li>
  <li>Express</li>
  <li>MongoDB</li>
</ul>
<h2>Folder Structure</h2>
<pre><div class="dark bg-gray-950 rounded-md"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs">
  inotebook/ (React frontend)
│   └── ...
├── api/ (Node.js backend)
│   └── ...
└── README.md
  </code></div></div></pre>
<h2>Environment Variables</h2>
<h3>For Frontend (.env)</h3>
<ul>
  <li><code>REACT_APP_HOST_URL</code>: Frontend URL.</li>
  <li><code>REACT_APP_API_URL</code>: Backend URL.</li>
</ul>
<h3>For Backend (api/.env)</h3>
<ul>
  <li><code>mongoDBURI</code>: MongoDB connection URI.</li>
  <li><code>JWT_SECRET</code>: Secret key for JWT token generation.</li>
  <li><code>node_mailer_url</code>: URL endpoint for SMTP server.</li>
  <li><code>node_mailer_username</code>: Username for SMTP server authentication.</li>
  <li><code>node_mailer_password</code>: Password for SMTP server authentication.</li>
  <li><code>FRONTEND_URL</code>: Frontend URL for CORS.</li>
</ul>
<h2>Setting Up</h2>
<ol>
  <li>
    <p>Clone the repository:</p>
    <pre><div class="dark bg-gray-950 rounded-md"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">git <span class="hljs-built_in">clone</span> https://github.com/TheRealKrishna/inotebook
  </code></div></div></pre>
  </li>
  <li>
    <p>Navigate to the project directory:</p>
    <pre><div class="dark bg-gray-950 rounded-md"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash"><span class="hljs-built_in">cd</span> inotebook
  </code></div></div></pre>
  </li>
  <li>
    <p>Set up environment variables by creating a <code>.env</code> file in the <code>api</code> directory and add the
      necessary variables mentioned above.</p>
  </li>
  <li>
    <p>Install dependencies:</p>
    <pre><div class="dark bg-gray-950 rounded-md"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">npm install
  <span class="hljs-built_in">cd</span> @
  npm install
  </code></div></div></pre>
  </li>
  <li>
    <p>Start the backend server:</p>
    <pre><div class="dark bg-gray-950 rounded-md"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">node api/index.js
  </code></div></div></pre>
  </li>
  <li>
    <p>Start the frontend development server:</p>
    <pre><div class="dark bg-gray-950 rounded-md"><div class="flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md"></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash"><span class="hljs-built_in">cd</span> @
  npm start
  </code></div></div></pre>
  </li>
  <li>
    <p>Access the application at <code>http://localhost:3000</code>.</p>
  </li>
</ol>
<h2>License</h2>
<p>This project's licensing information is not provided.</p>
<p>Feel free to reach out if you have any questions or suggestions! 😊</p>
<p>GitHub Link: <a target="_new" href="https://github.com/TheRealKrishna/inotebook">iNoteBook Repository</a></p>