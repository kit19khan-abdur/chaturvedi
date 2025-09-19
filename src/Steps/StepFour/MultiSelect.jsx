import React, { useState, useRef, useEffect } from "react";
import "./MultiSelect.css";

const MultiSelect = ({ options, placeholder = "Select..." }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleAll = () => {
    if (selected.length === options.length) {
      setSelected([]);
    } else {
      setSelected(options.map((o) => o.value));
    }
  };

  const toggleOne = (value) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="ms-container" ref={ref}>
      <div className="ms-control" onClick={() => setOpen(!open)}>
        {selected.length === 0
          ? placeholder
          : selected.length === options.length
          ? "All selected"
          : `${selected.length} selected`}
        <span className="ms-arrow">{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="ms-dropdown">
          <label className="ms-option">
            <input
              type="checkbox"
              checked={selected.length === options.length}
              onChange={toggleAll}
            />{" "}
            Select All
          </label>
          <div className="ms-divider" />
          {options.map((opt) => (
            <label key={opt.value} className="ms-option">
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => toggleOne(opt.value)}
                
              />{" "}
              {opt.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
