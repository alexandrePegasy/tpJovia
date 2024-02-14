import { useState, useEffect } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const response = await fetch('/api/users');
    const data = await response.json();
    setUsers(data);
  }

  async function addUser(event) {
    event.preventDefault();
    await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    setName('');
    fetchUsers();
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <form onSubmit={addUser} className="mb-8 flex gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom d'utilisateur"
          className="flex-1 p-2 border border-gray-300 rounded text-black"
        />
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Ajouter
        </button>
      </form>
      <ul className="list-disc pl-5">
        {users.map((user, index) => (
          <li key={index} className="py-2" dangerouslySetInnerHTML={{ __html: user.name }}></li>
        ))}
      </ul>
      <button onClick={fetchUsers} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        Charger les utilisateurs
      </button>
    </div>
  );
}