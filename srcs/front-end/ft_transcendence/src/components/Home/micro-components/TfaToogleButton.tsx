import React, { useState } from "react";
import { useMutation} from "@apollo/client";
import { UPDATE_USER } from "../graphl/Mutation";
import "../css/Home.css";

interface PropsTfaToggleButton {
    userId: number;
    tfaCode?: string;
  }
  
  export const TfaToggleButton = ({ userId, tfaCode }: PropsTfaToggleButton): JSX.Element => {
    const [updateUser] = useMutation(UPDATE_USER);
    const [isChecked, setIsChecked] = useState(tfaCode ? true : false);
    const handleToggle = () => {
        const newTfaCode = isChecked ? null : "true";
      updateUser({
        variables: {
          input: {
            id: userId,
            tfa_code: newTfaCode,
          },
        },
      })
        .then((response) => {
            setIsChecked(prevChecked => !prevChecked); // Inverse la valeur de isChecked
            const userFromStorage = JSON.parse(sessionStorage.getItem('user') || '');
            userFromStorage.tfa_code = newTfaCode;
            sessionStorage.setItem('user', JSON.stringify(userFromStorage));
        })
        .catch((error) => {
          console.error("Error updating user:", error);
        });
    };
  
    return (
      <div className="toggle-button-container">
        <input type="checkbox" id="switch" checked={isChecked} onChange={handleToggle} />
        <label htmlFor="switch" className={`toggle-button ${isChecked ? "activated" : "deactivated"}`}>
          <span className="toggle-button-text">
            {isChecked ? "2FA ACTIVATED" : "2FA DESACTIVATED"}
          </span>
        </label>
      </div>
    );
  };
  