'use client'
import React, { useState, useMemo } from 'react'
import type { TextFieldClientProps } from 'payload'
import { useField, FieldLabel, Button } from '@payloadcms/ui'
import { X, Search } from 'lucide-react'

import { getIconComponent, getIconLabel, searchIcons } from './iconList'
import './index.scss'

type IconPickerComponentProps = TextFieldClientProps & {
  iconSize?: number
  columns?: number
}

export const IconPickerComponent: React.FC<IconPickerComponentProps> = ({
  field,
  path,
  readOnly,
  iconSize = 24,
  columns = 8,
}) => {
  const { label } = field
  const { value, setValue } = useField<string>({ path: path || field.name })

  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [displayCount, setDisplayCount] = useState(50) // Mostrar 50 iconos inicialmente

  const ICONS_PER_PAGE = 50

  // Filtrar iconos según búsqueda (por nombre en inglés o label en español)
  const filteredIcons = useMemo(() => {
    return searchIcons(searchTerm)
  }, [searchTerm])

  // Iconos a mostrar (limitados por displayCount)
  const visibleIcons = useMemo(() => {
    return filteredIcons.slice(0, displayCount)
  }, [filteredIcons, displayCount])

  const hasMoreIcons = filteredIcons.length > displayCount

  // Cargar más iconos
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + ICONS_PER_PAGE)
  }

  // Reset display count cuando cambia la búsqueda
  React.useEffect(() => {
    setDisplayCount(ICONS_PER_PAGE)
  }, [searchTerm])

  // Reset display count cuando se abre el modal
  React.useEffect(() => {
    if (isOpen) {
      setDisplayCount(ICONS_PER_PAGE)
    }
  }, [isOpen])

  // Obtener el componente del icono seleccionado
  const SelectedIcon = value ? getIconComponent(value) : null

  const handleIconSelect = (iconName: string) => {
    setValue(iconName)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleClear = () => {
    setValue('')
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className="field-type icon-picker-field">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />
        {value && !readOnly && (
          <Button
            className="clear-button m-0"
            buttonStyle="secondary"
            size="small"
            onClick={handleClear}
            icon={<X size={14} />}
          >
            Limpiar
          </Button>
        )}
      </div>

      <div className="icon-picker-container">
        {/* Selected Icon Display */}
        <div
          className={`selected-icon-display ${!readOnly ? 'clickable' : ''}`}
          onClick={() => !readOnly && setIsOpen(!isOpen)}
          role="button"
          tabIndex={readOnly ? -1 : 0}
          onKeyDown={(e) => {
            if (!readOnly && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              setIsOpen(!isOpen)
            }
          }}
        >
          {SelectedIcon ? (
            <div className="icon-preview">
              <SelectedIcon size={iconSize} />
              <span className="icon-name">{getIconLabel(value)}</span>
            </div>
          ) : (
            <div className="icon-placeholder">
              <span>Selecciona un icono</span>
            </div>
          )}
        </div>

        {/* Icon Picker Modal */}
        {isOpen && !readOnly && (
          <div className="icon-picker-modal">
            <div className="icon-picker-header">
              <div className="search-container">
                <Search size={16} className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar iconos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                  autoFocus
                />
              </div>
              <button
                className="close-button"
                onClick={() => {
                  setIsOpen(false)
                  setSearchTerm('')
                }}
                aria-label="Cerrar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="icon-picker-content">
              {filteredIcons.length > 0 ? (
                <>
                  <div
                    className="icon-grid"
                    style={{
                      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                    }}
                  >
                    {visibleIcons.map((iconName) => {
                      const IconComponent = getIconComponent(iconName)
                      if (!IconComponent) return null

                      const iconLabel = getIconLabel(iconName)

                      return (
                        <button
                          key={iconName}
                          className={`icon-item ${value === iconName ? 'selected' : ''}`}
                          onClick={() => handleIconSelect(iconName)}
                          title={iconLabel}
                          type="button"
                        >
                          <IconComponent size={iconSize} />
                          <span className="icon-label">{iconLabel}</span>
                        </button>
                      )
                    })}
                  </div>
                  {hasMoreIcons && (
                    <div className="load-more-container">
                      <button className="load-more-button" onClick={handleLoadMore} type="button">
                        Cargar más iconos ({filteredIcons.length - displayCount} restantes)
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="no-results">
                  <p>No se encontraron iconos</p>
                </div>
              )}
            </div>

            <div className="icon-picker-footer">
              <span className="icon-count">
                Mostrando {Math.min(displayCount, filteredIcons.length)} de {filteredIcons.length}{' '}
                {filteredIcons.length === 1 ? 'icono' : 'iconos'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Hidden input to store the value */}
      <input type="hidden" value={value || ''} name={path || field.name} />
    </div>
  )
}
