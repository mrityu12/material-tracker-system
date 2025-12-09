const express = require('express');
const MaterialData = require('../models/MaterialData');
const router = express.Router();

// Save Material Data
router.post('/save', async (req, res) => {
  try {
    const { cluster, station, items, selectedFolder, updatedBy } = req.body;

    console.log('📥 Saving data:', { cluster, station, updatedBy });

    let data = await MaterialData.findOne({ cluster, station });

    if (data) {
      // Update existing data
      data.items = items;
      data.selectedFolder = selectedFolder;
      data.updatedBy = updatedBy;
      data.lastUpdated = Date.now();
      await data.save();
      console.log('✅ Data updated successfully');
    } else {
      // Create new data
      data = new MaterialData({
        cluster,
        station,
        items,
        selectedFolder,
        updatedBy,
      });
      await data.save();
      console.log('✅ New data created successfully');
    }

    res.json({ 
      success: true,
      message: 'Data saved successfully', 
      data 
    });
  } catch (error) {
    console.error('❌ Error saving data:', error.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
});

// Load Material Data for specific cluster and station
router.get('/load/:cluster/:station', async (req, res) => {
  try {
    const { cluster, station } = req.params;
    console.log('📤 Loading data for:', { cluster, station });
    
    const data = await MaterialData.findOne({ cluster, station });

    if (!data) {
      return res.status(404).json({ 
        success: false,
        message: 'Data not found' 
      });
    }

    res.json(data);
  } catch (error) {
    console.error('❌ Error loading data:', error.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
});

// Get all data (for admin)
router.get('/all', async (req, res) => {
  try {
    console.log('📊 Admin requesting all data');
    const allData = await MaterialData.find().sort({ lastUpdated: -1 });
    console.log(`✅ Found ${allData.length} records`);
    res.json(allData);
  } catch (error) {
    console.error('❌ Error fetching all data:', error.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
});

// Delete data (optional - for admin)
router.delete('/delete/:cluster/:station', async (req, res) => {
  try {
    const { cluster, station } = req.params;
    await MaterialData.deleteOne({ cluster, station });
    res.json({ success: true, message: 'Data deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting data:', error.message);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
});

module.exports = router;