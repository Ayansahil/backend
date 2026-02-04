import { useEffect, useState, useRef } from "react";
import axios from "axios";

const COLORS = [
  "#FFF176", // yellow
  "#FFB74D", // orange
  "#EF9A9A", // red-pink
  "#CE93D8", // purple
  "#81C784", // green
  "#4DD0E1", // cyan
  "#F06292", // hot-pink
  "#A1887F", // brown-ish
];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const App = () => {
  const [notes, setNotes] = useState([]);
  const [createTitle, setCreateTitle] = useState("");
  const [createDesc, setCreateDesc] = useState("");

  // Edit modal state
  const [editNote, setEditNote] = useState(null); // full note obj or null
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Toast
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  // Search
  const [search, setSearch] = useState("");

  // ──────────────── helpers ────────────────
  function showToast(msg, type = "success") {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ msg, type });
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }

  function fetchNotes() {
    axios
      .get("https://notes-app-g18m.onrender.com/api/notes")
      .then((res) => setNotes(res.data.note||[]))
      .catch(() => showToast("Failed to fetch notes", "error"));
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  // ──────────────── CRUD ────────────────
  function handleCreate(e) {
    e.preventDefault();
    if (!createTitle.trim()) return;
    axios
      .post("https://notes-app-g18m.onrender.com/api/notes/", {
        title: createTitle,
        description: createDesc,
        color: getRandomColor(),
      })
      .then(() => {
        showToast("Note created! 🎉");
        setCreateTitle("");
        setCreateDesc("");
        fetchNotes();
      })
      .catch(() => showToast("Failed to create note", "error"));
  }

  function handleDelete(noteId) {
    axios
      .delete("https://notes-app-g18m.onrender.com/api/notes/" + noteId)
      .then(() => {
        showToast("Note deleted 🗑️");
        fetchNotes();
      })
      .catch(() => showToast("Failed to delete note", "error"));
  }

  function openEdit(note) {
    setEditNote(note);
    setEditTitle(note.title);
    setEditDescription(note.description);
  }

  function closeEdit() {
    setEditNote(null);
    setEditTitle("");
    setEditDescription("");
  }

  function handleUpdate(e) {
    e.preventDefault();
    if (!editTitle.trim() || !editNote) return;
    axios
      .put("https://notes-app-g18m.onrender.com/api/notes/" + editNote._id, {
        title: editTitle,
        description: editDescription,
      })
      .then(() => {
        showToast("Note updated ✨");
        closeEdit();
        fetchNotes();
      })
      .catch(() => showToast("Failed to update note", "error"));
  }

  // ──────────────── filtered list ────────────────
  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      (n.description || "").toLowerCase().includes(search.toLowerCase())
  );

  // ──────────────── RENDER ────────────────
  return (
    <div className="app-wrapper">
      {/* ── background decoration ── */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      {/* ── header ── */}
      <header className="header">
        <div className="header-inner">
          <div className="logo-group">
            <span className="logo-icon">📝</span>
            <h1 className="logo-text">MyNotes</h1>
          </div>
          <input
            className="search-input"
            type="text"
            placeholder="🔍  Search notes…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      {/* ── create form ── */}
      <section className="create-section">
        <form className="create-form" onSubmit={handleCreate}>
          <div className="create-inputs">
            <input
              className="input create-title"
              type="text"
              placeholder="Title…"
              value={createTitle}
              onChange={(e) => setCreateTitle(e.target.value)}
            />
            <input
              className="input create-desc"
              type="text"
              placeholder="Description (optional)"
              value={createDesc}
              onChange={(e) => setCreateDesc(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-create">
            <span className="btn-icon">+</span> Add Note
          </button>
        </form>
      </section>

      {/* ── notes grid ── */}
      <main className="notes-grid">
        {filtered.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🗂️</span>
            <p>No notes yet — create one above!</p>
          </div>
        )}

        {filtered.map((note, idx) => (
          <div
            className="note-card"
            key={note._id || idx}
            style={{
              backgroundColor: note.color || COLORS[idx % COLORS.length],
              animationDelay: `${idx * 0.06}s`,
            }}
          >
            {/* pin */}
            <div className="pin" />

            <h2 className="note-title">{note.title}</h2>
            {note.description && (
              <p className="note-desc">{note.description}</p>
            )}

            {/* action buttons */}
            <div className="note-actions">
              <button
                className="icon-btn icon-btn-edit"
                onClick={() => openEdit(note)}
                title="Edit"
              >
                ✏️
              </button>
              <button
                className="icon-btn icon-btn-delete"
                onClick={() => handleDelete(note._id)}
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </main>

      {/* ── EDIT MODAL ── */}
      {editNote && (
        <div className="modal-overlay" onClick={closeEdit}>
          <div
            className="modal"
            style={{ borderTop: `5px solid ${editNote.color || "#FFF176"}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2 className="modal-title">Edit Note</h2>
              <button className="modal-close" onClick={closeEdit}>
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdate} className="modal-form">
              <label className="label">Title</label>
              <input
                className="input modal-input"
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <label className="label">Description</label>
              <input
                className="input modal-input"
                type="text"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
              />

              <div className="modal-actions">
                <button type="button" className="btn btn-cancel" onClick={closeEdit}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-save">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── TOAST ── */}
      {toast && (
        <div className={`toast ${toast.type === "error" ? "toast-error" : "toast-success"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
};

export default App;