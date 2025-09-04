import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { db } from "../firebase";
import { collection, addDoc, Timestamp, query, where, orderBy, onSnapshot } from "firebase/firestore";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [studyHours, setStudyHours] = useState("");
  const [breakTime, setBreakTime] = useState("");
  const [sleep, setSleep] = useState("");
  const [stress, setStress] = useState(3);
  const [focus, setFocus] = useState(3);
  const [reflection, setReflection] = useState("");
  const [message, setMessage] = useState("");

  const [logs, setLogs] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await addDoc(collection(db, "habits"), {
        uid: user.uid,
        studyHours,
        breakTime,
        sleep,
        stress,
        focus,
        reflection,
        createdAt: Timestamp.now(),
      });
      setMessage("✅ Log saved!");
      setStudyHours("");
      setBreakTime("");
      setSleep("");
      setStress(3);
      setFocus(3);
      setReflection("");
    } catch (err) {
      setMessage("❌ Error saving log: " + err.message);
    }
  }

  // Fetch logs in realtime
  useEffect(() => {
    const q = query(
      collection(db, "habits"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLogs(data);
    });
    return () => unsub();
  }, [user.uid]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center">Daily Wellness Log</h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          Logged in as <span className="font-mono">{user?.email}</span>
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="number"
            placeholder="Study Hours"
            className="w-full border p-2 rounded"
            value={studyHours}
            onChange={(e) => setStudyHours(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Break Time (minutes)"
            className="w-full border p-2 rounded"
            value={breakTime}
            onChange={(e) => setBreakTime(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Sleep Hours"
            className="w-full border p-2 rounded"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            required
          />

          <label className="block">
            Stress Level: {stress}
            <input
              type="range"
              min="1"
              max="5"
              value={stress}
              onChange={(e) => setStress(e.target.value)}
              className="w-full"
            />
          </label>

          <label className="block">
            Focus: {focus}
            <input
              type="range"
              min="1"
              max="5"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              className="w-full"
            />
          </label>

          <textarea
            placeholder="Reflection (markdown supported)"
            className="w-full border p-2 rounded"
            rows="4"
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Save Log
          </button>
        </form>

        {message && <p className="text-center mt-2">{message}</p>}

        {/* Logs List */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Your Past Logs</h2>
          <ul className="space-y-3">
            {logs.map((log) => (
              <li
                key={log.id}
                className="p-3 border rounded bg-gray-50 shadow-sm"
              >
                <p className="text-sm text-gray-600">
                  {log.createdAt?.toDate().toLocaleDateString()}
                </p>
                <p>📚 Study: {log.studyHours} hrs | 💤 Sleep: {log.sleep} hrs</p>
                <p>☕ Break: {log.breakTime} mins | Stress: {log.stress} | Focus: {log.focus}</p>
                {log.reflection && (
                  <p className="mt-1 text-gray-700 italic">
                    ✍ {log.reflection}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={logout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
