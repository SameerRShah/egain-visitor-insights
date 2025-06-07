import pandas as pd
import requests
import json
import time
from datetime import datetime
import os

def enrich_ip_data(ip_list, batch_size=40, sleep_time=60):
    """
    Enrich IP addresses with company and location data using IP-API
    
    Args:
        ip_list: List of IP addresses to enrich
        batch_size: Number of IPs to process before sleeping (respecting rate limits)
        sleep_time: Time to sleep between batches in seconds
    
    Returns:
        DataFrame with enriched IP data
    """
    results = []
    total_ips = len(ip_list)
    
    print(f"Starting IP enrichment for {total_ips} IPs at {datetime.now()}")
    
    for i, ip in enumerate(ip_list):
        try:
            # Check if we need to sleep to respect rate limits
            if i > 0 and i % batch_size == 0:
                print(f"Processed {i}/{total_ips} IPs. Sleeping for {sleep_time} seconds to respect rate limits...")
                time.sleep(sleep_time)
            
            # Make API request
            url = f'http://ip-api.com/json/{ip}'
            response = requests.get(url)
            data = response.json()
            
            # Skip if the request was not successful
            if data.get('status') != 'success':
                print(f"Failed to get data for IP {ip}: {data.get('message', 'Unknown error')}")
                continue
            
            # Extract relevant fields
            results.append({
                'IP': ip,
                'Organization': data.get('org', 'N/A'),
                'ISP': data.get('isp', 'N/A'),
                'AS': data.get('as', 'N/A'),
                'Country': data.get('country', 'N/A'),
                'CountryCode': data.get('countryCode', 'N/A'),
                'Region': data.get('regionName', 'N/A'),
                'City': data.get('city', 'N/A'),
                'Zip': data.get('zip', 'N/A'),
                'Latitude': data.get('lat', 0),
                'Longitude': data.get('lon', 0),
                'Timezone': data.get('timezone', 'N/A'),
                'IsHosting': 'AWS' in data.get('org', '') or 'Amazon' in data.get('org', '') or 
                            'Google' in data.get('org', '') or 'Microsoft' in data.get('org', '') or
                            'Azure' in data.get('org', '') or 'Cloud' in data.get('org', '') or
                            'Host' in data.get('org', '')
            })
            
            # Small sleep between requests to be nice to the API
            time.sleep(0.5)
            
            # Print progress every 10 IPs
            if (i + 1) % 10 == 0:
                print(f"Processed {i + 1}/{total_ips} IPs")
                
        except Exception as e:
            print(f"Error processing IP {ip}: {str(e)}")
    
    print(f"Completed IP enrichment at {datetime.now()}")
    return pd.DataFrame(results)

def main():
    # Create data directory if it doesn't exist
    os.makedirs('data', exist_ok=True)
    
    # Load unique IPs from the processed data
    try:
        # Try to load from unique_ips.csv if it exists
        print("Loading unique IPs from data/unique_ips.csv")
        unique_ips_df = pd.read_csv('data/unique_ips.csv')
        unique_ips = unique_ips_df['IP'].tolist()
    except:
        # If not, load from processed_sample.csv
        print("Loading unique IPs from data/processed_sample.csv")
        df = pd.read_csv('data/processed_sample.csv')
        unique_ips = df['IP'].unique().tolist()
        
        # Save unique IPs for future use
        pd.DataFrame({'IP': unique_ips}).to_csv('data/unique_ips.csv', index=False)
    
    print(f"Found {len(unique_ips)} unique IP addresses")
    
    # For testing, limit to a smaller number
    # Comment this out for full processing
    # unique_ips = unique_ips[:100]
    
    # Enrich IP data
    enriched_data = enrich_ip_data(unique_ips)
    
    # Save enriched data
    enriched_data.to_csv('data/enriched_ip_data.csv', index=False)
    print(f"Saved enriched data to data/enriched_ip_data.csv")
    
    # Create a lookup dictionary for faster access
    ip_lookup = enriched_data.set_index('IP').to_dict(orient='index')
    
    # Save as JSON for easy import in web application
    with open('data/ip_lookup.json', 'w') as f:
        json.dump(ip_lookup, f)
    print(f"Saved IP lookup dictionary to data/ip_lookup.json")
    
    # Print some statistics
    print("\nEnrichment Statistics:")
    print(f"Total unique IPs: {len(enriched_data)}")
    print(f"Unique organizations: {enriched_data['Organization'].nunique()}")
    print(f"Unique countries: {enriched_data['Country'].nunique()}")
    print(f"Hosting IPs: {enriched_data['IsHosting'].sum()}")
    
    # Top organizations
    print("\nTop 10 Organizations:")
    print(enriched_data['Organization'].value_counts().head(10))
    
    # Top countries
    print("\nTop 10 Countries:")
    print(enriched_data['Country'].value_counts().head(10))

if __name__ == "__main__":
    main()

