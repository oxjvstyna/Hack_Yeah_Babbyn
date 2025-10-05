import React, { useState, useEffect } from "react";
import { Rating } from "react-native-ratings";
import { Text, View } from "react-native";
import { funRating, secRating } from "@/hooks/api";

type StarProps = {
  title: string;
  iso: string;
  ratingStart: number;
  isFun: boolean;
};

export default function Star({ title, iso, ratingStart, isFun }: StarProps) {
  const [rating, setRating] = useState<number>(ratingStart);

  useEffect(() => {
    if (rating !== ratingStart) {
      if (isFun) funRating(iso, rating);
      else secRating(iso, rating);
    }
  }, [rating]);

  return (
    <View>
      <Text style={{ fontSize: 18, color: "black" }}>{title}</Text>
      <Rating
        style={{ alignItems: "flex-start" }}
        type="custom"
        ratingCount={5}
        startingValue={rating}
        imageSize={30}
        onSwipeRating={(v) => setRating(v)}
        // onFinishRating={(v: number) => {
        //   setRating(v);
        // }}
        tintColor="#fff"
        ratingBackgroundColor="#e5e7eb"
        // readonly={rating > 0}
      />
    </View>
  );
}
