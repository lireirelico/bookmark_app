// src/App.jsx
import React, { Component } from 'react';
import BookmarkService from './api/BookmarkService';
import {
  TextField,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  CardActions,
  Grid,
  InputAdornment,
  AppBar,
  Toolbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import LinkIcon from '@mui/icons-material/Link';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';

class App extends Component {
  state = {
    bookmarks: [],
    title: '',
    url: '',
    error: null,
    loading: true,
    searchQuery: '',
    editDialogOpen: false,
    editingBookmark: null,
  };

  componentDidMount() {
    this.fetchBookmarks();
  }

  fetchBookmarks = async () => {
    try {
      const response = await BookmarkService.getBookmarks();
      
      if (!response.data || !response.data.bookmarks) {
        throw new Error('Неверный формат ответа от сервера');
      }

      this.setState({ 
        bookmarks: response.data.bookmarks,
        loading: false
      });
    } catch (error) {
      console.error("Ошибка загрузки закладок:", error);
      this.setState({ 
        error: error.message,
        loading: false
      });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  validateURL = (url) => {
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-._~:/?#[\]@!$&'()*+,;=]*)?$/;
    return urlRegex.test(url);
  };

  handleAddBookmark = async () => {
    const { title, url } = this.state;
    
    if (!title || !url) {
      alert('Заполните все поля');
      return;
    }
    if (!this.validateURL(url)) {
      alert('Введите корректный URL');
      return;
    }

    try {
      const response = await BookmarkService.createBookmark(title, url);
      
      if (response.data.createBookmark.errors.length === 0) {
        this.setState(prevState => ({
          bookmarks: [...prevState.bookmarks, response.data.createBookmark.bookmark],
          title: '',
          url: ''
        }));
      } else {
        alert("Ошибка создания: " + response.data.createBookmark.errors.join(', '));
      }
    } catch (error) {
      alert("Ошибка при создании закладки: " + error.message);
    }
  };

  handleDeleteBookmark = async (id) => {
    try {
      const response = await BookmarkService.deleteBookmark(id);

      if (response.data.deleteBookmark.errors.length === 0) {
        this.setState(prevState => ({
          bookmarks: prevState.bookmarks.filter(b => b.id !== id)
        }));
      } else {
        alert("Ошибка удаления: " + response.data.deleteBookmark.errors.join(', '));
      }
    } catch (error) {
      alert("Ошибка при удалении закладки: " + error.message);
    }
  };

  handleEditClick = (bookmark) => {
    this.setState({
      editingBookmark: bookmark,
      editDialogOpen: true,
      title: bookmark.title,
      url: bookmark.url
    });
  };

  handleEditClose = () => {
    this.setState({
      editingBookmark: null,
      editDialogOpen: false,
      title: '',
      url: ''
    });
  };

  handleEditSave = async () => {
    const { editingBookmark, title, url } = this.state;

    if (!title || !url) {
      alert('Заполните все поля');
      return;
    }
    if (!this.validateURL(url)) {
      alert('Введите корректный URL');
      return;
    }

    try {
      const response = await BookmarkService.updateBookmark(editingBookmark.id, title, url);
      
      if (response.data.updateBookmark.errors.length === 0) {
        this.setState(prevState => ({
          bookmarks: prevState.bookmarks.map(b =>
            b.id === editingBookmark.id ? response.data.updateBookmark.bookmark : b
          )
        }));
        this.handleEditClose();
      } else {
        alert("Ошибка обновления: " + response.data.updateBookmark.errors.join(', '));
      }
    } catch (error) {
      alert("Ошибка при обновлении закладки: " + error.message);
    }
  };

  getFilteredBookmarks = () => {
    const { bookmarks, searchQuery } = this.state;
    if (!searchQuery) return bookmarks;

    const query = searchQuery.toLowerCase();
    return bookmarks.filter(bookmark =>
      bookmark.title.toLowerCase().includes(query) ||
      bookmark.url.toLowerCase().includes(query)
    );
  };

  handleOpenLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  render() {
    const { title, url, error, loading, searchQuery, editDialogOpen } = this.state;
    const filteredBookmarks = this.getFilteredBookmarks();
    
    const header = (
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: 'white', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ display: 'flex', gap: 2 }}>
          <BookmarkIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ color: 'text.primary', minWidth: 'max-content' }}>
            Мои Закладки
          </Typography>
          <Paper
            sx={{
              flexGrow: 1,
              maxWidth: 600,
              boxShadow: 'none',
              border: 1,
              borderColor: 'divider',
              borderRadius: 2,
              ml: 2
            }}
          >
            <TextField
              fullWidth
              placeholder="Поиск закладок..."
              name="searchQuery"
              value={searchQuery}
              onChange={this.handleInputChange}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" sx={{ ml: 1 }} />
                  </InputAdornment>
                ),
                disableUnderline: true,
                sx: { px: 1, py: 0.5 }
              }}
            />
          </Paper>
        </Toolbar>
      </AppBar>
    );
    
    if (loading) {
      return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
          {header}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh' 
          }}>
            <Typography variant="h5">Загрузка...</Typography>
          </Box>
        </Box>
      );
    }

    if (error) {
      return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
          {header}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh' 
          }}>
            <Typography variant="h5" color="error">Ошибка: {error}</Typography>
          </Box>
        </Box>
      );
    }

    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
        {header}
        
        <Box sx={{ 
          display: 'flex', 
          pt: '64px', // высота AppBar
          minHeight: 'calc(100vh - 64px)',
        }}>
          {/* Основная область с закладками */}
          <Box sx={{ 
            flex: 1,
            p: 3,
            pb: 20, // Добавляем отступ снизу для формы
            overflowY: 'auto'
          }}>
            <Grid container spacing={2}>
              {filteredBookmarks.map(bookmark => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={bookmark.id}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        boxShadow: 6,
                        transform: 'translateY(-2px)',
                        transition: 'all 0.2s ease-in-out'
                      }
                    }}
                  >
                    <CardContent 
                      onClick={() => this.handleOpenLink(bookmark.url)}
                      sx={{ 
                        cursor: 'pointer',
                        flexGrow: 1,
                        '&:hover': {
                          backgroundColor: 'action.hover'
                        }
                      }}
                    >
                      <Typography variant="h6" component="div" gutterBottom>
                        {bookmark.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {bookmark.url}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end', borderTop: 1, borderColor: 'divider' }}>
                      <IconButton
                        size="small"
                        onClick={() => this.handleEditClick(bookmark)}
                        sx={{ 
                          '&:hover': { 
                            color: 'primary.main',
                            backgroundColor: 'primary.light' 
                          }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => this.handleDeleteBookmark(bookmark.id)}
                        sx={{ 
                          '&:hover': { 
                            color: 'error.main',
                            backgroundColor: 'error.light' 
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Форма добавления в правом нижнем углу */}
        <Paper 
          elevation={6}
          sx={{ 
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 320,
            p: 2,
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: theme => `0 8px 32px ${theme.palette.action.hover}`,
            zIndex: 1000
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AddIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">
              Добавить закладку
            </Typography>
          </Box>
          
          <TextField
            fullWidth
            size="small"
            label="Название"
            name="title"
            value={title}
            onChange={this.handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            size="small"
            label="URL"
            name="url"
            value={url}
            onChange={this.handleInputChange}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LinkIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={this.handleAddBookmark}
            fullWidth
            startIcon={<AddIcon />}
            sx={{ 
              py: 1,
              textTransform: 'none',
              fontSize: '1rem'
            }}
          >
            Добавить
          </Button>
        </Paper>

        <Dialog 
          open={editDialogOpen} 
          onClose={this.handleEditClose}
          PaperProps={{
            sx: {
              borderRadius: 2,
              minWidth: '400px'
            }
          }}
        >
          <DialogTitle sx={{ pb: 1 }}>
            <Typography variant="h6">Редактировать закладку</Typography>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              label="Название"
              type="text"
              fullWidth
              value={title}
              onChange={this.handleInputChange}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="dense"
              name="url"
              label="URL"
              type="text"
              fullWidth
              value={url}
              onChange={this.handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button 
              onClick={this.handleEditClose}
              sx={{ 
                textTransform: 'none',
                color: 'text.secondary' 
              }}
            >
              Отмена
            </Button>
            <Button 
              onClick={this.handleEditSave} 
              variant="contained"
              sx={{ 
                textTransform: 'none',
                px: 3
              }}
            >
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}

export default App;
