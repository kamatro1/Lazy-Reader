import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './SidePanel.css';

interface DropdownMenuProps {
    initialImageSrc: string;
    readingLvl?: string;
    setReadingLvl?: (arg0: string) => void;
    length?: string;
    setLength?: (arg0: string) => void;
    optionType: 'readingLevel' | 'length';
}

function DropdownMenu({ initialImageSrc, readingLvl = '', setReadingLvl = () => {}, length = '', setLength = () => {}, optionType} : DropdownMenuProps) {
    const [imageSrc, setImageSrc] = useState(initialImageSrc);
    
    const handleOptionChange = (option: string) => {
        if (optionType === 'readingLevel') {
            setReadingLvl(option);
            handleReadingLevelChange(option);
        } else if (optionType === 'length') {
            setLength(option);
            handleLengthChange(option);
        }
    };
    
    const handleReadingLevelChange = (level: string) => {
        const imagePath = `../icons/playful-ui/dropdown/reading-level-dropdown/reading-level-dropdown-${level.charAt(0)}.svg`;
        setImageSrc(imagePath);
    };
    
    const handleLengthChange = (length: string) => {
        const imagePath = `../icons/playful-ui/dropdown/length-dropdown/length-dropdown-${length}.svg`;
        setImageSrc(imagePath);
    };
    
    return (
        <div className="dropdown" onClick={(e) => e.currentTarget.classList.add(':hover')}>
            <img src={imageSrc} alt="Image" style={{ cursor: 'pointer' }} />
            <div className="dropdown-content">
                {optionType === 'readingLevel' && (
                    <>
                        <a href="#" onClick={() => handleOptionChange('beginner')}>Beginner</a>
                        <a href="#" onClick={() => handleOptionChange('intermediate')}>Intermediate</a>
                        <a href="#" onClick={() => handleOptionChange('advanced')}>Advanced</a>
                    </>
                )}
                {optionType === 'length' && (
                    <>
                        <a href="#" onClick={() => handleOptionChange('s')}>S</a>
                        <a href="#" onClick={() => handleOptionChange('m')}>M</a>
                        <a href="#" onClick={() => handleOptionChange('l')}>L</a>
                    </>
                )}
            </div>
        </div>
    );
}

export default DropdownMenu;