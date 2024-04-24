import React, { useState, useEffect, useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './SidePanel.css';
import { SettingsContext } from './SidePanel';

interface DropdownMenuProps {
    setValue: (arg0: string) => void;
    optionType: 'readingLevel' | 'length';
}

function DropdownMenu({ setValue, optionType }: DropdownMenuProps) {
    const { playful } = useContext(SettingsContext);
    const [imageSrc, setImageSrc] = useState('');
    
    useEffect(() => {
        const imagePath = `../icons/${playful ? 'playful-ui' : 'plain-ui'}/dropdown/${optionType}-dropdown/${optionType}-dropdown.svg`;
        setImageSrc(imagePath);
    }, [playful, optionType]);

    const handleOptionChange = (option: string) => {
        setValue(option);
        const imagePath = playful 
            ? `../icons/playful-ui/dropdown/${optionType}-dropdown/${optionType}-dropdown-${option.charAt(0)}.svg` 
            : `../icons/plain-ui/dropdown/${optionType}-dropdown/${optionType}-dropdown-${option.charAt(0)}.svg`;
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