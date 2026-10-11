export const setTheme = (req, res) => {
  const { theme } = req.body;

  if (!['light', 'dark'].includes(theme)) {
    return res.status(400).json({
      message: 'Theme must be light or dark',
    });
  }

  res.cookie('theme', theme, {
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: 'lax',
  });

  res.json({
    message: 'Theme saved',
    theme,
  });
};

export const getTheme = (req, res) => {
  const theme = req.cookies.theme || 'light';

  res.json({
    theme,
  });
};
