module.exports = ({ env }) => ({
  // Configure CKEditor plugin with custom configuration
  'ckeditor5': {
    enabled: true,
    resolve: '@_sh/strapi-plugin-ckeditor',
    config: {
      presets: {
        default: {
          field: {
            key: "default",
            value: "default",
            metaData: {
              intlLabel: {
                id: "ckeditor5.preset.default.label",
                defaultMessage: "Default"
              },
              intlDescription: {
                id: "ckeditor5.preset.default.description",
                defaultMessage: "Default editor configuration"
              }
            }
          },
          editorConfig: {
            language: 'en',
            image: {
              resizeUnit: "%",
              resizeOptions: [
                {
                  name: 'resizeImage:original',
                  value: null,
                  icon: 'original'
                },
                {
                  name: 'resizeImage:25',
                  value: '25',
                  icon: 'small'
                },
                {
                  name: 'resizeImage:50',
                  value: '50',
                  icon: 'medium'
                },
                {
                  name: 'resizeImage:75',
                  value: '75',
                  icon: 'large'
                }
              ],
              toolbar: [
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                '|',
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'resizeImage:25',
                'resizeImage:50',
                'resizeImage:75',
                'resizeImage:original'
              ]
            },
            table: {
              contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
            },
            heading: {
              options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' }
              ]
            },
            htmlSupport: {
              allow: [
                {
                  name: /^.*$/,
                  styles: true,
                  attributes: true,
                  classes: true
                }
              ]
            },
            link: {
              decorators: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://',
                toggleDownloadable: {
                  mode: 'manual',
                  label: 'Downloadable',
                  attributes: {
                    download: 'file'
                  }
                }
              }
            },
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              'underline',
              'strikethrough',
              '|',
              'fontSize',
              'fontColor',
              'fontBackgroundColor',
              '|',
              'alignment',
              '|',
              'numberedList',
              'bulletedList',
              'todoList',
              '|',
              'outdent',
              'indent',
              '|',
              'link',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              '|',
              'undo',
              'redo',
              '|',
              'sourceEditing'
            ]
          }
        },
        enhanced: {
          field: {
            key: "enhanced",
            value: "enhanced",
            metaData: {
              intlLabel: {
                id: "ckeditor5.preset.enhanced.label",
                defaultMessage: "Enhanced HTML Editor"
              },
              intlDescription: {
                id: "ckeditor5.preset.enhanced.description",
                defaultMessage: "Enhanced editor with more formatting options"
              }
            }
          },
          editorConfig: {
            language: 'en',
            image: {
              resizeUnit: "%",
              resizeOptions: [
                {
                  name: 'resizeImage:original',
                  value: null,
                  icon: 'original'
                },
                {
                  name: 'resizeImage:25',
                  value: '25',
                  icon: 'small'
                },
                {
                  name: 'resizeImage:50',
                  value: '50',
                  icon: 'medium'
                },
                {
                  name: 'resizeImage:75',
                  value: '75',
                  icon: 'large'
                }
              ],
              toolbar: [
                'imageStyle:inline',
                'imageStyle:block',
                'imageStyle:side',
                '|',
                'toggleImageCaption',
                'imageTextAlternative',
                '|',
                'resizeImage:25',
                'resizeImage:50',
                'resizeImage:75',
                'resizeImage:original'
              ]
            },
            table: {
              contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableCellProperties', 'tableProperties']
            },
            heading: {
              options: [
                { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
              ]
            },
            htmlSupport: {
              allow: [
                {
                  name: /^.*$/,
                  styles: true,
                  attributes: true,
                  classes: true
                }
              ]
            },
            link: {
              decorators: {
                addTargetToExternalLinks: true,
                defaultProtocol: 'https://',
                toggleDownloadable: {
                  mode: 'manual',
                  label: 'Downloadable',
                  attributes: {
                    download: 'file'
                  }
                }
              }
            },
            toolbar: [
              'heading',
              '|',
              'bold',
              'italic',
              'underline',
              'strikethrough',
              'subscript',
              'superscript',
              '|',
              'fontSize',
              'fontFamily',
              'fontColor',
              'fontBackgroundColor',
              '|',
              'alignment',
              '|',
              'numberedList',
              'bulletedList',
              'todoList',
              '|',
              'outdent',
              'indent',
              '|',
              'link',
              'blockQuote',
              'insertTable',
              'mediaEmbed',
              'codeBlock',
              'htmlEmbed',
              '|',
              'horizontalLine',
              'pageBreak',
              '|',
              'undo',
              'redo',
              '|',
              'sourceEditing'
            ]
          }
        }
      }
    }
  },
  
  // Configure other plugins
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
  
  // Upload provider configuration (if needed)
  upload: {
    config: {
      provider: 'local',
      providerOptions: {
        sizeLimit: 100000000, // 100MB
      },
    },
  },
});
