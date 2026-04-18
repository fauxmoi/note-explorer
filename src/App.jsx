import React, { useState, useMemo, useEffect, useRef } from 'react';// --- Icons (Inline SVGs) ---

const FolderIcon = ({ color, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
  </svg>
);

const FileTextIcon = ({ color, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
  </svg>
);

const GridIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);

const ListIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

const PlusIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ArrowLeftIcon = ({ className, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const SettingsIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

function TextPreview({ item, apiBase }) {
  const [text, setText] = React.useState('Loading...');

  useEffect(() => {
    let alive = true;

    fetch(`${apiBase}/api/files/${encodeURIComponent(item.storedName)}`)
      .then(res => res.text())
      .then(data => {
        if (alive) setText(data);
      })
      .catch(() => {
        if (alive) setText('Could not preview this file.');
      });

    return () => {
      alive = false;
    };
  }, [item, apiBase]);

  return (
    <pre className="whitespace-pre-wrap break-words text-sm text-white/90">
      {text}
    </pre>
  );
}

export default function App() {
  // --- Local Storage Init ---
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('note_explorer_data');
    return saved ? JSON.parse(saved) : [
      { id: '1', type: 'folder', name: 'Ideas & Concepts', parentId: null, color: '#ff4444', createdAt: new Date().toLocaleDateString() },
      { id: '2', type: 'folder', name: 'Work Projects', parentId: null, color: '#44ff88', createdAt: new Date().toLocaleDateString() },
    ];
  });

  useEffect(() => {
    localStorage.setItem('note_explorer_data', JSON.stringify(items));
  }, [items]);

  // --- UI State ---
  const API_BASE = 'http://localhost:3001';
  const fileInputRef = useRef(null);
  const [filePreviewItem, setFilePreviewItem] = useState(null);
  const [filePreviewText, setFilePreviewText] = useState('');
  const [currentFolderId, setCurrentFolderId] = useState(null);
  const [openNoteId, setOpenNoteId] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); 
  const [isCreating, setIsCreating] = useState(false);
  const [newItemType, setNewItemType] = useState('folder');
  const [newItemName, setNewItemName] = useState('');
  const [newItemColor, setNewItemColor] = useState('#ff0044');
  
  const [contextMenu, setContextMenu] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editItemName, setEditItemName] = useState('');
  const [editItemColor, setEditItemColor] = useState('#ff0044');

  // --- Derived ---
  const currentFolder = items.find(item => item.id === currentFolderId);
  const currentAccentColor = currentFolder?.color || '#808080';
  const currentItems = items.filter(item => item.parentId === currentFolderId);

  const breadcrumbs = useMemo(() => {
    const path = [];
    let currentId = currentFolderId;
    while (currentId) {
      const folder = items.find(i => i.id === currentId);
      if (folder) {
        path.unshift(folder);
        currentId = folder.parentId;
      } else { break; }
    }
    return path;
  }, [items, currentFolderId]);

  useEffect(() => {
    if (currentFolder) {
      setNewItemColor(currentFolder.color);
    } else {
      setNewItemColor('#ff0044');
    }
  }, [currentFolderId, currentFolder]);

  // --- Handlers ---
  const handleItemClick = (item) => {
  if (item.type === 'folder') {
    setCurrentFolderId(item.id);
    return;
  }

  if (item.type === 'file') {
    openFile(item);
    return;
  }

  if (item.type === 'note') {
    setOpenNoteId(item.id);
  }
};

  const handleCreateItem = () => {
    if (!newItemName.trim()) return;
    const newItem = {
      id: Date.now().toString(),
      type: newItemType,
      name: newItemName,
      parentId: currentFolderId,
      createdAt: new Date().toLocaleDateString(),
      content: '',
      noteBgColor: '#0a0a0a',
      noteTextColor: '#ffffff',
      noteBgImage: '',
      color: newItemType === 'folder' ? newItemColor : null
    };
    setItems([...items, newItem]);
    setIsCreating(false);
    setNewItemName('');
  };

  const deleteItem = (id) => {
    const toDelete = [id];
    const findChildren = (pid) => {
      items.filter(i => i.parentId === pid).forEach(child => {
        toDelete.push(child.id);
        if (child.type === 'folder') findChildren(child.id);
      });
    };
    findChildren(id);
    setItems(items.filter(i => !toDelete.includes(i.id)));
    setContextMenu(null);
  };

  const handleContextMenu = (e, item) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY, itemId: item.id });
  };

  const openEditModal = (id) => {
    const itemToEdit = items.find(i => i.id === id);
    if (itemToEdit) {
      setEditItemName(itemToEdit.name);
      setEditItemColor(itemToEdit.color || '#ff0044');
      setEditingItemId(id);
    }
    setContextMenu(null);
  };

  const handleSaveEdit = () => {
    if (!editItemName.trim()) return;
    setItems(items.map(item => {
      if (item.id === editingItemId) {
        return {
          ...item,
          name: editItemName,
          ...(item.type === 'folder' ? { color: editItemColor } : {})
        };
      }
      return item;
    }));
    setEditingItemId(null);
  };

  const isPreviewableFile = (item) => {
  if (!item?.previewable) return false;
  return true;
};

const getFileUrl = (item) => {
  return `${API_BASE}/api/files/${encodeURIComponent(item.storedName)}`;
};

const downloadFile = (item) => {
  const a = document.createElement('a');
  a.href = `${getFileUrl(item)}?download=1`;
  a.click();
};

const openFile = (item) => {
  if (isPreviewableFile(item)) {
    setFilePreviewItem(item);
  } else {
    downloadFile(item);
  }
};

const handleFileUpload = async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('parentId', currentFolderId ?? '');

  const res = await fetch(`${API_BASE}/api/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) return;

  const uploaded = await res.json();
  setItems(prev => [...prev, uploaded]);
  e.target.value = '';
};

  const updateNote = (noteId, updates) => {
    setItems(items.map(item => item.id === noteId ? { ...item, ...updates } : item));
  };

  const openNote = items.find(i => i.id === openNoteId);

  return (
    <div 
      className="min-h-screen w-full bg-black text-white font-sans flex flex-col transition-colors duration-700 select-none"
      style={{ '--app-accent': currentAccentColor }}
      onClick={() => setContextMenu(null)}
    >
      <div 
        className="h-1 w-full transition-colors duration-700 sticky top-0 z-50"
        style={{ backgroundColor: currentAccentColor }}
      ></div>

      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-md z-40">
        <div className="flex items-center space-x-4">
          {currentFolderId && (
            <button 
              onClick={() => setCurrentFolderId(currentFolder?.parentId || null)}
              className="p-1.5 rounded border border-white/10 hover:border-[var(--app-accent)] transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" style={{ color: currentAccentColor }} />
            </button>
          )}
          <nav className="flex items-center space-x-2 text-sm font-medium">
            <span 
              className={`cursor-pointer transition-colors ${!currentFolderId ? 'text-white' : 'text-gray-500 hover:text-white'}`}
              onClick={() => setCurrentFolderId(null)}
            >
              Root
            </span>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.id}>
                <span className="text-gray-700">/</span>
                <span 
                  className="cursor-pointer transition-colors"
                  style={{ color: idx === breadcrumbs.length - 1 ? crumb.color : '#666' }}
                  onClick={() => setCurrentFolderId(crumb.id)}
                >
                  {crumb.name}
                </span>
              </React.Fragment>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex bg-white/5 rounded-lg p-1 border border-white/10">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-all duration-300 ${viewMode === 'grid' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
            >
              <GridIcon />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-all duration-300 ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-white'}`}
            >
              <ListIcon />
            </button>
          </div>

          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center space-x-2 bg-white text-black px-4 py-1.5 rounded font-bold hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="text-sm">NEW ITEM</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center space-x-2 border border-white/10 text-white px-4 py-1.5 rounded font-bold hover:border-[var(--app-accent)] transition-colors"
          >
            <span className="text-sm">UPLOAD FILE</span>
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
            {currentItems.map(item => {
              const itemColor = item.type === 'folder' ? item.color : '#ffffff';
              return (
                <div 
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  onContextMenu={(e) => handleContextMenu(e, item)}
                  className="group flex flex-col items-center p-4 border border-white/5 rounded-lg hover:border-[var(--item-accent)] transition-all duration-300 cursor-pointer relative"
                  style={{ 
                    '--item-accent': itemColor,
                    boxShadow: 'inset 0 0 20px transparent'
                  }}
                >
                  {/* Enhanced Grid Hover Overlay */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-15 pointer-events-none transition-opacity duration-300"
                    style={{ backgroundColor: itemColor, boxShadow: `0 0 20px ${itemColor}` }}
                  ></div>
                  
                  <div className="mb-3 transition-transform group-hover:scale-110 duration-300 ease-out">
                    {item.type === 'folder' ? (
                      <FolderIcon color={itemColor} className="w-12 h-12" />
                    ) : item.type === 'note' ? (
                      <FileTextIcon 
                        color="#888" 
                        className="w-12 h-12 group-hover:stroke-white transition-colors duration-300" 
                      />
                    ) : item.type === 'file' ? (
                      <FileTextIcon 
                        color="#00d0ff"   // optional: distinguish files visually
                        className="w-12 h-12 group-hover:stroke-white transition-colors duration-300" 
                      />
                    ) : null}
                  </div>
                  <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors duration-300 text-center truncate w-full">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full">
            <div className="flex items-center px-4 py-2 border-b border-white/10 text-xs font-bold text-gray-600 uppercase tracking-widest">
              <div className="flex-1">Name</div>
              <div className="w-32 text-right">Date Created</div>
            </div>
            {currentItems.map(item => {
              const itemColor = item.type === 'folder' ? item.color : '#888';
              return (
                <div 
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  onContextMenu={(e) => handleContextMenu(e, item)}
                  className="flex items-center px-4 py-3 border border-transparent border-b-white/5 hover:border-[var(--item-accent)] transition-all duration-300 cursor-pointer group relative"
                  style={{ '--item-accent': itemColor }}
                >
                  {/* Dynamic List Hover Background */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                    style={{ backgroundColor: itemColor }}
                  ></div>

                  <div className="flex-1 flex items-center space-x-3 relative z-10">
                    {item.type === 'folder' ? (
                      <FolderIcon color={itemColor} className="w-5 h-5" />
                    ) : item.type === 'note' ? (
                      <FileTextIcon 
                        color={itemColor} 
                        className="w-5 h-5 group-hover:stroke-white transition-colors duration-300" 
                      />
                    ) : item.type === 'file' ? (
                      <FileTextIcon 
                        color="#00d0ff"   // optional visual difference
                        className="w-5 h-5 group-hover:stroke-white transition-colors duration-300" 
                      />
                    ) : null}
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-300">{item.name}</span>
                  </div>
                  <div className="w-32 text-right text-xs text-gray-600 relative z-10">{item.createdAt}</div>
                </div>
              );
            })}
          </div>
        )}

        {currentItems.length === 0 && (
          <div className="h-64 flex flex-col items-center justify-center border border-white/5 rounded-2xl bg-white/[0.02]">
             <span className="text-gray-700 font-mono text-sm tracking-tighter">EMPTY_DIRECTORY</span>
          </div>
        )}
      </main>

      {contextMenu && (
        <div 
          className="fixed z-[100] bg-[#111] border border-white/10 rounded shadow-2xl py-1 min-w-[120px]"
          style={{ top: contextMenu.y, left: contextMenu.x }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => openEditModal(contextMenu.itemId)} className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors">Edit</button>
          <button onClick={() => deleteItem(contextMenu.itemId)} className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-white/5 transition-colors">Delete</button>
        </div>
      )}

      {editingItemId && (() => {
        const itemBeingEdited = items.find(i => i.id === editingItemId);
        return (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4">
            <div className="bg-black border border-white/10 rounded-lg p-8 w-full max-w-sm shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              <h2 className="text-lg font-black tracking-widest uppercase mb-8 border-b border-white/10 pb-2">Edit Object</h2>
              <div className="space-y-6">
                <input type="text" value={editItemName} onChange={(e) => setEditItemName(e.target.value)} className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-[var(--app-accent)] text-lg transition-colors duration-300" placeholder="Enter name..." autoFocus />
                {itemBeingEdited?.type === 'folder' && (
                  <div className="flex flex-col space-y-2">
                    <label className="text-[10px] text-gray-500 uppercase tracking-widest">Accent Color</label>
                    <div className="flex items-center space-x-2">
                      <input type="color" value={editItemColor} onChange={(e) => setEditItemColor(e.target.value)} className="w-8 h-8 rounded bg-transparent border-0 p-0 cursor-pointer" />
                      <input type="text" value={editItemColor} onChange={(e) => setEditItemColor(e.target.value)} className="flex-1 bg-black border border-white/20 px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-white/40 uppercase" />
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mt-12">
                <button onClick={() => setEditingItemId(null)} className="text-xs font-bold text-gray-600 hover:text-white uppercase tracking-widest">Cancel</button>
                <button onClick={handleSaveEdit} className="bg-[var(--app-accent)] text-black px-8 py-2 text-xs font-black uppercase tracking-widest transition-colors hover:bg-white">Save</button>
              </div>
            </div>
          </div>
        );
      })()}

      {isCreating && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] flex items-center justify-center p-4">
          <div className="bg-black border border-white/10 rounded-lg p-8 w-full max-w-sm shadow-[0_0_50px_rgba(255,255,255,0.05)]">
            <h2 className="text-lg font-black tracking-widest uppercase mb-8 border-b border-white/10 pb-2">New Object</h2>
            <div className="flex space-x-2 mb-8">
              <button onClick={() => setNewItemType('folder')} className={`flex-1 py-2 text-xs font-bold border transition-all duration-300 ${newItemType === 'folder' ? 'bg-white text-black border-white shadow-lg' : 'border-white/10 text-gray-600 hover:border-white/30'}`}>FOLDER</button>
              <button onClick={() => setNewItemType('note')} className={`flex-1 py-2 text-xs font-bold border transition-all duration-300 ${newItemType === 'note' ? 'bg-white text-black border-white shadow-lg' : 'border-white/10 text-gray-600 hover:border-white/30'}`}>NOTE</button>
            </div>
            <div className="space-y-6">
              <input type="text" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-white focus:outline-none focus:border-[var(--app-accent)] text-lg transition-colors duration-300" placeholder="Enter name..." autoFocus />
              {newItemType === 'folder' && (
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase tracking-widest">Accent Color</label>
                  <div className="flex items-center space-x-2">
                    <input type="color" value={newItemColor} onChange={(e) => setNewItemColor(e.target.value)} className="w-8 h-8 rounded bg-transparent border-0 p-0 cursor-pointer" />
                    <input type="text" value={newItemColor} onChange={(e) => setNewItemColor(e.target.value)} className="flex-1 bg-black border border-white/20 px-2 py-1 text-xs font-mono text-white focus:outline-none focus:border-white/40 uppercase" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-12">
              <button onClick={() => setIsCreating(false)} className="text-xs font-bold text-gray-600 hover:text-white uppercase tracking-widest">Cancel</button>
              <button onClick={handleCreateItem} className="bg-[var(--app-accent)] text-black px-8 py-2 text-xs font-black uppercase tracking-widest transition-colors hover:bg-white">Construct</button>
            </div>
          </div>
        </div>
      )}

      {openNote && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xl z-[70] flex items-center justify-center p-8">
          <div 
            className="w-full max-w-5xl h-full max-h-[90vh] rounded-lg shadow-2xl overflow-hidden flex flex-col border border-white/10"
            style={{ 
              backgroundColor: openNote.noteBgColor, 
              color: openNote.noteTextColor,
              backgroundImage: openNote.noteBgImage ? `url(${openNote.noteBgImage})` : 'none',
              backgroundSize: 'cover'
            }}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/5">
              <span className="text-sm font-bold uppercase tracking-widest opacity-60">Note View / {openNote.name}</span>
              <div className="flex items-center space-x-6">
                <div className="group relative">
                  <button className="p-2 border border-white/10 rounded hover:border-white/40 transition-colors"><SettingsIcon className="w-4 h-4"/></button>
                  <div className="absolute right-0 top-full w-64 bg-[#0a0a0a] border border-white/10 rounded p-4 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto transition-all duration-200 z-[80] shadow-2xl origin-top-right">
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest">Background Color</label>
                        <div className="flex items-center space-x-2">
                          <input type="color" value={openNote.noteBgColor} onChange={(e) => updateNote(openNote.id, { noteBgColor: e.target.value })} className="w-6 h-6 bg-transparent cursor-pointer" />
                          <input type="text" value={openNote.noteBgColor} onChange={(e) => updateNote(openNote.id, { noteBgColor: e.target.value })} className="flex-1 bg-black border border-white/20 px-2 py-1 text-[10px] font-mono text-white focus:outline-none focus:border-white/40 uppercase" />
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1">
                        <label className="text-[10px] text-gray-500 uppercase tracking-widest">Text Color</label>
                        <div className="flex items-center space-x-2">
                          <input type="color" value={openNote.noteTextColor} onChange={(e) => updateNote(openNote.id, { noteTextColor: e.target.value })} className="w-6 h-6 bg-transparent cursor-pointer" />
                          <input type="text" value={openNote.noteTextColor} onChange={(e) => updateNote(openNote.id, { noteTextColor: e.target.value })} className="flex-1 bg-black border border-white/20 px-2 py-1 text-[10px] font-mono text-white focus:outline-none focus:border-white/40 uppercase" />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-500 uppercase block mb-1 tracking-widest">Image URL</label>
                        <input type="text" value={openNote.noteBgImage} onChange={(e) => updateNote(openNote.id, { noteBgImage: e.target.value })} className="w-full bg-black border border-white/20 text-[10px] p-1 text-white focus:outline-none focus:border-white/40" placeholder="https://..." />
                      </div>
                    </div>
                  </div>
                </div>
                <button onClick={() => setOpenNoteId(null)} className="bg-white text-black text-[10px] font-black px-4 py-2 uppercase tracking-widest hover:bg-gray-200 transition-colors">Close</button>
              </div>
            </div>
            <textarea 
              value={openNote.content}
              onChange={(e) => updateNote(openNote.id, { content: e.target.value })}
              className="flex-1 bg-transparent p-12 text-xl font-medium resize-none focus:outline-none placeholder:text-white/10 transition-colors duration-500"
              placeholder="System prompt: enter text content here..."
              style={{ color: 'inherit' }}
            />
          </div>
        </div>
      )}

      {filePreviewItem && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-[80] flex items-center justify-center p-6">
          <div className="bg-black border border-white/10 rounded-lg w-full max-w-5xl h-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="text-sm font-bold truncate">{filePreviewItem.name}</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => downloadFile(filePreviewItem)}
                  className="text-xs font-bold px-3 py-2 border border-white/10 rounded hover:border-white/40"
                >
                  Download
                </button>
                <button
                  onClick={() => setFilePreviewItem(null)}
                  className="text-xs font-bold px-3 py-2 bg-white text-black rounded"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-auto bg-[#0a0a0a] p-4">
              {filePreviewItem.mimeType?.startsWith('image/') ? (
                <img
                  src={getFileUrl(filePreviewItem)}
                  alt={filePreviewItem.name}
                  className="max-w-full h-auto mx-auto"
                />
              ) : filePreviewItem.mimeType === 'application/pdf' ? (
                <iframe
                  src={getFileUrl(filePreviewItem)}
                  title={filePreviewItem.name}
                  className="w-full h-full min-h-[80vh]"
                />
              ) : (
                <TextPreview item={filePreviewItem} apiBase={API_BASE} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}