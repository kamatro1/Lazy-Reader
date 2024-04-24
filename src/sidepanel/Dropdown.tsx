import React, { useState, useEffect, useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './SidePanel.css';
import { SettingsContext } from './SidePanel';

interface DropdownMenuProps {
    setValue: (arg0: string) => void;
    optionType: 'readingLevel' | 'length';
}

function DropdownMenu({ setValue, optionType }: DropdownMenuProps) {
    const { playful, colorTheme } = useContext(SettingsContext);
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        updateImageSrc(playful, colorTheme, optionType);
    }, [playful, colorTheme, optionType]);

    const updateImageSrc = (playful: boolean, colorTheme: string, optionType: string) => {
        const defaultTheme = playful ? 'playful-ui' : 'plain-ui';
        const defaultImage = `../icons/${defaultTheme}/dropdown/${optionType}-dropdown/${optionType}-dropdown-${colorTheme}.svg`;
        setImageSrc(defaultImage);
    };


    const handleOptionChange = (option: string) => {
        setValue(option);
        const imagePath = playful 
            ? `../icons/playful-ui/dropdown/${optionType}-dropdown/${optionType}-dropdown-${option.charAt(0)}-${colorTheme}.svg` 
            : `../icons/plain-ui/dropdown/${optionType}-dropdown/${optionType}-dropdown-${option.charAt(0)}-${colorTheme}.svg`;
        setImageSrc(imagePath);
    };
    
    return (
        <div className="dropdown" onClick={(e) => e.currentTarget.classList.add(':hover')}>
            <img src={imageSrc} alt="dropdown" style={{ cursor: 'pointer' }} />
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