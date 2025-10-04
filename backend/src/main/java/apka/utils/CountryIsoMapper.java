package apka.utils;

import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.MissingResourceException;

@Component
public class CountryIsoMapper {

    private final Map<String, String> iso3ToPolishName = new HashMap<>();
    private final Map<String, String> iso3ToEnglishName = new HashMap<>();
    private final Map<String, String> polishNameToIso3 = new HashMap<>();
    private final Map<String, String> englishNameToIso3 = new HashMap<>();

    public CountryIsoMapper() {
        Locale polish = new Locale("pl");
        for (String iso2 : Locale.getISOCountries()) {
            Locale locale = new Locale("", iso2);
            try {
                String iso3 = locale.getISO3Country();
                String namePl = locale.getDisplayCountry(polish);
                String nameEn = locale.getDisplayCountry(Locale.ENGLISH);

                iso3ToPolishName.put(iso3, namePl);
                iso3ToEnglishName.put(iso3, nameEn);

                polishNameToIso3.put(namePl.toLowerCase(), iso3);
                englishNameToIso3.put(nameEn.toLowerCase(), iso3);

            } catch (MissingResourceException ignored) {
            }
        }
    }

    public String toEnglish(String iso3) {
        if (iso3 == null) return null;
        return iso3ToEnglishName.getOrDefault(iso3.toUpperCase(), iso3);
    }

    public String toIso3FromEnglish(String nameEn) {
        if (nameEn == null) return null;
        return englishNameToIso3.get(nameEn.toLowerCase());
    }

    public Map<String, String> getAllEnglish() {
        return Collections.unmodifiableMap(iso3ToEnglishName);
    }
}
