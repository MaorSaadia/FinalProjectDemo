import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

function DropDown({ list, label, searchable, listMode, onValueChange }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(list);

  // Add a callback function to handle value changes
  const handleValueChange = (selectedValue) => {
    setValue(selectedValue);
    // Pass the selected value to the parent component using the onValueChange callback
    onValueChange(selectedValue);
  };

  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={handleValueChange}
          setItems={setItems}
          searchable={searchable}
          placeholder={label}
          listMode={listMode}
          searchPlaceholder="חפש מוסד"
        />
      </View>
    </View>
  );
}

export default DropDown;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
    paddingTop: 7,
  },
});
